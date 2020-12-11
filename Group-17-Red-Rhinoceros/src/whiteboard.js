import React from "react";


export default class Whiteboard extends React.PureComponent{
    canvas = document.createElement('canvas');
    context = this.canvas.getContext("2d");

    constructor(props){
        super(props);
        this.paint = false;
        this.style = props.style;
        this.canvasWidth = props.style.width;
        this.canvasHeight = props.style.height;
        this.canvas.setAttribute("width", this.canvasWidth);
        this.canvas.setAttribute("height", this.canvasHeight);
        this.context.rect(0, 0, this.canvasWidth, this.canvasHeight); 
        this.context.fillStyle= "#f2f2f2"; // 图片北京色是灰色，此处去除会变黑色
        this.context.fill();
        this.context.strokeStyle = "#666";
        this.context.lineJoin = "round";
        this.context.lineWidth = 2;
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.infoX = new Array();
        this.infoY = new Array();
        this.point = {notFirst:false};
        this.info = new Array();
        this.state = {pixels: []};
        this.pointsUpdate = props.onChange;
        this.returnDraw = props.canvasUpdate;
        this.clearRemoteWhiteboard = props.clear;
    }

    addClick = (x,y,dragging) => {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    draw = () => {
        let context = this.canvas.getContext("2d");
        while(this.clickX.length > 0){
            this.point.bx = this.point.x;
            this.point.by = this.point.y;
            this.point.x = this.clickX.pop();
            this.point.y = this.clickY.pop();
            this.point.drag = this.clickDrag.pop();
            context.beginPath();
            if (this.point.drag && this.point.notFirst){
                context.moveTo(this.point.bx,this.point.by);
            }else{
                this.point.notFirst = true;
                context.moveTo(this.point.x-1,this.point.y)
            }
            context.lineTo(this.point.x, this.point.y);
            context.closePath();
            context.stroke();
        }
    }

    remoteUpdate = (pos) => {
        let context = this.canvas.getContext("2d");
        let point = {notFirst:false};
        console.log("adfas",pos);
        for (let i = 0; i < pos.length; i++){
            point.bx = point.x;
            point.by = point.y;
            let p = pos[i];
            point.x = p[0];
            point.y = p[1];
            point.drag = p[2];
            context.beginPath();
            console.log(point.drag,point.notFirst);
            if (point.drag && point.notFirst){
                context.moveTo(point.bx,point.by);
            }else{
                point.notFirst = true;
                context.moveTo(point.x-1,point.y)
            }
            context.lineTo(point.x, point.y);
            context.closePath();
            context.stroke();
        }
    }

    clear = () =>{
        let context = this.canvas.getContext("2d");
        context.rect(0, 0, this.canvasWidth, this.canvasHeight); 
        context.fillStyle= "#f2f2f2"; // 图片背景色是灰色，此处去除会变黑色
        context.fill();
        context.strokeStyle = "#666";
        context.lineJoin = "round";
        context.lineWidth = 2;
        
    }

    Pressclear = () => {
        this.clear();
        this.clearRemoteWhiteboard();
    }

    getBias = () =>{
        let left = this.canvas.getBoundingClientRect().left;
        let top = this.canvas.getBoundingClientRect().top;
        return {left, top};
    }

    listen = (classname) => {
        
        this.refs["canvas_pos"].addEventListener("mousedown", (e)=>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            this.paint = true;
            this.infoX.push(e.pageX-left);
            this.infoY.push(e.pageY-top);
            this.info.push([e.pageX-left,e.pageY-top,false])
            this.addClick(e.pageX-left, e.pageY-top);
            this.draw();
        });

        
        this.refs['canvas_pos'].addEventListener("mousemove", (e) =>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            if (!this.paint){
                return;
            }
            this.infoX.push(e.pageX-left);
            this.infoY.push(e.pageY-top);
            this.info.push([e.pageX-left,e.pageY-top,true]);
            this.addClick(e.pageX-left, e.pageY-top,true);
            this.draw();
        });


        this.refs['canvas_pos'].addEventListener("mouseup", (e) =>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            this.paint = false;

            this.pointsUpdate(this.info);

            this.info  = new Array();
            this.infoX = new Array();
            this.infoY = new Array();
        });

        this.refs['canvas_pos'].addEventListener("mouseleave", (e) =>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            if (this.paint){
                this.pointsUpdate(this.info);
            }
            this.paint = false;

            this.info  = new Array();
            this.infoX = new Array();
            this.infoY = new Array();
        });

        this.refs["canvas_pos"].addEventListener("touchstart", (e)=>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            this.paint = true;
            console.log(e.pageX, e.pageY, top, left);
            this.addClick(e.pageX-left, e.pageY-top);
            this.draw();
        });
        
        this.refs["canvas_pos"].addEventListener("touchmove", (e)=>{
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            if (!this.paint){
                return;
            }
            this.addClick(e.pageX-left, e.pageY-top,true);
            this.draw();
        });

        this.refs["canvas_pos"].addEventListener("touchend", function(e){
            let bias = this.getBias();
            let left = bias.left;
            let top = bias.top;
            this.paint = false;
        });
    }

    sendToServer = (messageType, payload) => {
        this.socket.emit(messageType, {
          socketID: this.socket.id,
          payload
        })
    }

    componentDidMount(){
        this.returnDraw(this.remoteUpdate,this.clear);

        this.refs['canvas_pos'].appendChild(this.canvas);
       
        this.listen(this.classname);

        
    }

    render(){
        return(
            <div style = {{display: "inline-block" }} ref = 'canvas_pos'>
                <div><button onClick = {this.Pressclear}> Clear</button></div>
            </div>
        );
    }
}

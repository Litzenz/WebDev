import React from "react";
import Draw from "./draw";
import "./Canvas.css";

export default class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.style = props.style;
    this.canvasWidth = props.style.width;
    this.canvasHeight = props.style.height;
    console.log("Width:", this.canvasWidth);
  }
  /* 重置功能 */
  reset() {
    Draw.clear();
  }

  /* 导出 */
  exp() {
    let exportImg = Draw.exportImg();
    console.log('exportImg: ', exportImg);
    if(exportImg === -1) {
      return console.log('please draw!');
    }
    this.refs['imgC'].src = exportImg;
  }

  render() {
    return (
      <div className="component-canvas">
        <div className="canvas-wrap" ref='canvas-wrap'></div>
        <div className="button-wrap">
          <button onClick={this.reset}>reset</button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    Draw.init(this.refs['canvas-wrap']);
  }
}

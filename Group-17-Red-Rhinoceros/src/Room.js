import React, { Component } from 'react';
import io from 'socket.io-client'


import Whiteboard from './whiteboard';

// import antd Layout
import { Layout, Button, Input, Modal, notification, Col, Row } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./Room.css";
const {Header, Content, Footer} = Layout;

class Room extends Component {
    
    constructor(props) {
        super(props)

        // https://reactjs.org/docs/refs-and-the-dom.html
        this.localVideoref = React.createRef()
        //for multi user prepare 
        this.canvas = React.createRef();
        this.remoteVideoref1 = React.createRef()
        this.remoteVideoref2 = React.createRef() 
        // this.remoteRefList = [this.remoteVideoref1, this.remoteVideoref2]
        this.remoteRefList = new Array();
        this.currentRefNum = 0 
        //for multi user prepare 
        this.localStream = null 
        this.roomId = this.props.roomId
        this.userName = this.props.userName 
        this.type = this.props.type
    
        this.socket = null
        this.pcMap = new Map()
        this.refMap = new Map()
        this.screenShare = false; 
        this.muteSelf = false;
        this.isHost = this.props.isHost

        this.messages = [];
        this.state = {
          numGuest: 0,
          isChat: false
        }

        this.draw = null;
        this.canvasClear = null;
    }
    

    componentDidMount = () => { 
        console.log("this room room id is " + this.roomId)
        console.log("this user name is " + this.userName)
        console.log("this room type is " + this.type)

        console.log("socket", typeof(this.socket), this.socket);

        const canvas = this.canvas.current;


        this.socket = io(
            '/room',
            {
              path: '/webrtc',
              query: {}
            }
          )

        this.socket.on('connection-success', success => {
    
            if (this.type === "create") { 
                var createData = { 
                room: this.roomId
                }
                this.sendToServer("createRoom", createData)
            } else if(this.type === "join") { 
                var joinData = { 
                room: this.roomId 
                }
                this.sendToServer("joinRoom", joinData)
            }
            console.log('connection success')
        })

        this.socket.on('roomInfo', (info) => {
            //get roominfo from server， members are in info.details 
            const pc_config = {
                "iceServers": [
                  {
                    urls : 'stun:stun.l.google.com:19302'
                  }
                ]
            }

            for(var i = 0; i < info.details.length;i++) { 
                var tmpPc = new RTCPeerConnection(pc_config)
                this.pcMap.set(info.details[i],tmpPc)
            }
            var whiteboardHis = info.whiteboard;
            for (const pos of whiteboardHis){
                this.draw(pos);
            }

        })

        this.socket.on('offer', (data) => {
            const pc_config = {
                "iceServers": [
                  {
                    urls : 'stun:stun.l.google.com:19302'
                  }
                ]
            }

            console.log("Setting remote description from offer from "+data.id)
            console.log(data.payload)
            var pc = new RTCPeerConnection(pc_config)
            // triggered when a new candidate is returned
            pc.onicecandidate = (e) => {
                // send the candidates to the remote peer
                // see addCandidate below to be triggered on the remote peer
                if (e.candidate) {
                console.log('on icecandidate by '+this.socket.id + " to "+data.id)
                this.sendToServer('candidate', {info:e.candidate,toId:data.id})
                }
            }

            pc.addEventListener('iceconnectionstatechange',iceconnectionstatechange)
            //gggg
            pc.addEventListener('track', function(e) { 
                gotRemoteStream(e,data.id)
            }, false);
            this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
            

            this.pcMap.set(data.id,pc)
            this.pcMap.get(data.id).setRemoteDescription(new RTCSessionDescription(data.payload)) 
            this.pcMap.get(data.id).createAnswer({ offerToReceiveVideo: 1 ,offerToReceiveAudio: 1})
                .then(sdp => {
                // set answer sdp as local description
                this.pcMap.get(data.id).setLocalDescription(sdp)
                this.sendToServer('answer', {sdp:sdp,toId:data.id})
                console.log('Sending answer to server by ' + this.socket.id)
            })
        })

        this.socket.on("answer",(data) => { 
            
            console.log("Setting remote description from answer from "+data.id)
            console.log(data.payload)
            this.pcMap.get(data.id).setRemoteDescription(new RTCSessionDescription(data.payload))
        })

        this.socket.on("candidate",(data) => { 
            console.log(console.log('Adding ice candidate by ' + data.id)) 
            this.pcMap.get(data.id).addIceCandidate(new RTCIceCandidate(data.payload))
        })
        // server call back shows that there are already some one screen sharing in the room 
        this.socket.on("screenRejected", (data) => { 
            console.log(data.message) 
            alert(data.message)
        })
        
        // show messages in chat pannel or notify new message by pop-up window
        this.socket.on("receiveChat", (data) => { 
            this.messages.push(data.message)
            if (this.state.isChat) {
                let Li = document.createElement("li")
                Li.innerHTML = data.message
                let Ul = document.getElementById("chatList")
                Ul.appendChild(Li);
                Ul.scrollTop = Ul.scrollHeight; 
            } else {
                const args = {
                    message: 'New Message',
                    description:
                      data.message,
                    duration: 2,
                  };
                notification.open(args);
            }           
        })

        // server accept the user's screen share request 
        this.socket.on("screenAccepted", (data) => { 
            console.log(data.message) 
            
            if (navigator.getDisplayMedia) {
                navigator.getDisplayMedia({video: true,audio:true}).then(SSTsuccess).catch(SSTfailure);
            } else if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({video: true,audio:true}).then(SSTsuccess).catch(SSTfailure);
            } else {
                navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}}).then(SSTsuccess).catch(SSTfailure);
            }
            this.sendToServer('screenShareStart', {room: this.roomId })
        })
        
        this.socket.on("muteSelf",(data) => { 
            
            muteSelf()

        })
        this.socket.on("unmuteSelf",(data) => { 
            unmuteSelf()
        })

        this.socket.on("muteOther",(data) => { 
            muteOther(data)
        })

        this.socket.on("unmuteOther",(data) => { 
            unmuteOther(data)
        })

        this.socket.on('endMeeting', (data) => { 
            console.log("endMeeting") 
            Modal.info({
                title: 'The host has ended the meeting.', 
                icon: <ExclamationCircleOutlined />,
                onOk(){
                    window.history.back(-1);
                },
            });
        })

        this.socket.on('handsUp', (data) => { 
            console.log("handsUp-data", data) 
            if(this.isHost == true) {
                // The host recieves a notificatiaon with a Button.
                const key = `open${Date.now()}`;
                const btn = (
                      <Button type="primary" size="small" onClick={() =>
                        // unmute the guest who just has his/her hands up 
                        this.sendToServer("unmuteSpecificUser", {room: this.roomId, ID:data.socketID})
                      }>
                        OK
                      </Button>
                    );
                notification.open({
                    message: data.username + ' has something to say!',
                    description:
                    'Press OK to unmute the guest, or just wait for this notification to close automatically.',
                    btn,
                    key,
                    duration: 3,  // This notification would close automatically in 3 seconds.
                    onClose: notification.close(key),
                });
            } else {
                // Other guests would recieve a notification with no confirm Button.
                notification.open({
                    message: data.username + ' has something to say!',
                    description:
                    'This notification would close automatically.',
                    onClick: () => {
                      console.log('Notification Clicked!');
                    },
                  });
            }
            
        })

        const muteSelf = () => { 
            this.muteSelf = true
            
            this.localVideoref.current.volume=0
            document.getElementById("muteSelfBtn").innerText = "Unmute"
        }
        //unmuteSelf, since the function is depretiated, only keep the textchange function 
        const unmuteSelf = () => { 
            this.muteSelf = false
            //depretiated 
            // this.localVideoref.current.volume=1
            document.getElementById("muteSelfBtn").innerText = "Mute"
        }

        const muteOther = (data) => { 
            console.log("mute other"+data.socketID)
            
            this.remoteRefList[this.refMap.get(data.socketID).num].current.volume=0
            this.refMap.set(data.socketID,{
                num:this.refMap.get(data.socketID).num, 
                muted: true
            })
        }

        const unmuteOther = (data) => { 
            console.log("unmute other"+data.socketID)

            this.remoteRefList[this.refMap.get(data.socketID).num].current.volume=1
            this.refMap.set(data.socketID,{
                num:this.refMap.get(data.socketID).num, 
                muted: false
            })
        }

        this.socket.on("UpdateCanvas", (data) => {
            this.draw(data.pos);
        })

        this.socket.on("GuestLeaving", (data) => {
            console.log(this.refMap.get(data.socketID).num);
            this.remoteRefList.splice(this.refMap.get(data.socketID).num, 1);
            this.setState(PrevState => {
                return{
                    numGuest: PrevState.numGuest - 1
                }
            })
            for(const [socketID, info] of this.refMap.entries()){
                if (info.num > this.refMap.get(data.socketID).num){
                    console.log(info.mute);
                    this.refMap.set(socketID, {
                        num: info.num - 1,
                        mute: info.mute
                    })
                }
            }
        });

        this.socket.on("ClearWhiteboard", (data) => {
            console.log("clean Canvas");
            this.canvasClear();
        })

        // called when getDisplayMedia() successfully returns - see below
        // getDisplayMedia() returns a MediaStream object 
        // set state, then replace track for every current pc 
        const SSTsuccess = (stream) => {
            navigator.mediaDevices
                .getUserMedia({audio: true})
                .then(AStream=>{ 
                    console.log('Get user display success by ' + this.socket.id)
                    let videoTrack = stream.getVideoTracks()[0];
                    let audioTrack = AStream.getAudioTracks()[0]; 
                    this.localStream.getTracks().forEach(track => track.stop()); 

                    this.screenShare = true; 
                    document.getElementById('ssBtn').innerText = "Stop Screen Share"

                    for (const [yocketID, pc] of this.pcMap.entries()) { 
                        var Vsender = pc.getSenders().find(function(s) {
                            return s.track.kind === videoTrack.kind;
                        });
                        var Asender = pc.getSenders().find(function(s) {
                            return s.track.kind === audioTrack.kind;
                        });
                        Vsender.replaceTrack(videoTrack);
                        Asender.replaceTrack(audioTrack);
                    }
                    stream.addTrack(audioTrack)
                    this.localVideoref.current.srcObject = stream
                    this.localStream = stream
                    this.localVideoref.current.volume=0
                    
                })
        }
        


        // called when screen share fails - see below
        const SSTfailure = (e) => {
            this.sendToServer("screenShareStop", {room: this.roomId })
            console.log('screen share Error: ', e)
        }

        // called when getUserMedia() successfully returns - see below
        // getUserMedia() returns a MediaStream object (https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
        const success = (stream) => {
            console.log('Get user media success by ' + this.socket.id)
            this.localVideoref.current.srcObject = stream
            
            this.localStream = stream
            this.localVideoref.current.volume=0
            if(this.type === "join") {
                for (const [socketID, pc] of this.pcMap.entries()) { 

                    // triggered when a new candidate is returned
                    pc.onicecandidate = (e) => {
                        // send the candidates to the remote peer
                        // see addCandidate below to be triggered on the remote peer
                        if (e.candidate) {
                        console.log('on icecandidate by '+this.socket.id + " to "+socketID)
                        this.sendToServer('candidate', {info:e.candidate,toId:socketID})
                        }
                    }

                    pc.addEventListener('iceconnectionstatechange',iceconnectionstatechange)
                    //gggg
                    pc.addEventListener('track', function(e) { 
                        gotRemoteStream(e,socketID)
                    }, false);
                    this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream)) 
                    
                }
                this.offer()
            }
        }
    
        // called when getUserMedia() fails - see below
        const failure = (e) => {
        console.log('getUserMedia Error: ', e)
        }
        
        // for multi user prepare 
        const gotRemoteStream = (e, socketID) => {
            console.log("called got remote stream"+socketID)
            console.log(e)
            var isRepeat = false; 
            for(var i=0; i< this.remoteRefList.length;i++) { 
                if(this.remoteRefList[i].current.srcObject === e.streams[0]) { 
                    isRepeat = true; 
                }
            }
            if(isRepeat===false) { 
                // If there is something wrong on the mute feature, please check here. The refMap may be wrong.
                let videoRef = React.createRef();
                this.remoteRefList.push(videoRef);
                this.setState(PrevState => {
                    return{
                        numGuest: PrevState.numGuest + 1
                    }
                });
                console.log(e.streams[0]);
                videoRef.current.srcObject = e.streams[0];
                this.refMap.set(socketID,{
                    num: this.state.numGuest - 1,
                    muted:false
                })
            }
            
        }

        const iceconnectionstatechange = (e) => {
            console.log(e)
        }
        
        
        const getConnect = () => { 
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
              })
            .then(success)
            .catch(failure)
        }

        function wait(pcMap){ 
            if (pcMap.size === 0){ 
                setTimeout(wait,100,pcMap); 
            } else { 
                getConnect();
            } 
        } 

    
        if (this.type === "join"){
            wait(this.pcMap);
        }else{
           getConnect();
        }
        
    }

    // re-render for chat pannel
    componentDidUpdate = () => {
        if (this.state.isChat) {
            let input = document.getElementById("chatInput");
            input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("chatSend").click();
            }
            });
        }
    }

    //set up existing pc 
    //then create and send offer 
    offer = () => { 
        for (const [socketID, pc] of this.pcMap.entries()) { 

            pc.createOffer({offerToReceiveVideo: 1 ,offerToReceiveAudio: 1}).then(sdp => { 
                // set offer sdp as local description
                pc.setLocalDescription(sdp) 
                this.sendToServer("offer",{sdp:sdp,toId:socketID}) 
                console.log('Sending offer to server by ' + this.socket.id)
            })
        }
        console.log("pcMap now is: "+this.pcMap) 
    }

    sendToServer = (messageType, payload) => {
        this.socket.emit(messageType, {
          socketID: this.socket.id,
          payload
        })
    }

    
    //mute/unmute depending on the the current condition 
    toggleMute =() => { 

        if(!this.muteSelf) {
            this.sendToServer("muteOne", {room: this.roomId})
        } else { 
            this.sendToServer("unmuteOne", {room: this.roomId})
        }
        
    }

    // send chat message to server
    chatSend = () => {
        console.log('clicked')
        this.sendToServer("sendChat", {
            user: this.userName,
            room: this.roomId,
            message: document.getElementById("chatInput").value
        })
        document.getElementById("chatInput").value="";
    }
    // click chat button to show/hide chat pannel
    chat = () => {
        this.setState({ isChat: true })
    }
    noChat = () => {
        this.setState({ isChat: false })
    }

    // check if the user is sharing screen, if yes, then stop it, if no, then ask server if it can start 
    screenSharing = () => { 
        console.log(this.screenShare)
        
        if(this.screenShare === false) { 
            this.sendToServer("screenShareRequest", {room: this.roomId })
        } else { 
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
              })
            .then((stream) => { 
                console.log('Get user media success by ' + this.socket.id)
                this.localStream.getTracks().forEach(track => track.stop()) 
                let videoTrack = stream.getVideoTracks()[0];
                for (const [socketID, pc] of this.pcMap.entries()) { 
                    var sender = pc.getSenders().find(function(s) {
                        return s.track.kind === videoTrack.kind;
                    });
                    sender.replaceTrack(videoTrack);
                }
                this.localVideoref.current.srcObject = stream
                this.localStream = stream
                this.localVideoref.current.volume=0
            })
            .catch((e) => { 
                this.sendToServer("screenShareStop", {room: this.roomId })
                console.log('screen share Error: ', e)
            })
            this.sendToServer("screenShareStop",{room: this.roomId })
            
            this.screenShare=false
            document.getElementById('ssBtn').innerText = "Screen Share"
        }
    }

    showEndConfirm = () => {
        const send = this.sendToServer
        const room = this.roomId
        Modal.confirm({
            title: 'Do you want to end the meeting?', 
            icon: <ExclamationCircleOutlined />,
            onOk(){
                send("endMeeting", {room: room})
            },
            onCancel() {},
        });

    }

    //Get invitation Url 
    getInviteUrl = () => { 
        var el = document.createElement('textarea');
        el.value = "Join Red Rhinoceros Meeting \n https://your-ngrok-path \n Meeting ID: ".concat(this.roomId);
        console.log(el.value)
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Successfully copied the message, paste to friends to invite");
    }

    showLeaveConfirm = () => {        
        Modal.confirm({
            title: 'Do you want to leave the meeting?', 
            icon: <ExclamationCircleOutlined />,
            onOk(){
                window.history.back(-1);
            },
            onCancel() {},
        });
    }

    handsUp = () => {
        console.log("handsup,", this.userName)
        this.sendToServer("handsUp", {room: this.roomId, username: this.userName})
    }

    canvasUpdate = (drawFunction,clear) => {
        this.draw = drawFunction;
        this.canvasClear = clear;
    };

    pointsUpdate = (pos) => {
        console.log(pos);
        this.sendToServer("UpdateWhiteboard",{room: this.roomId,pos:pos});
    };

    clearRemoteWhiteboard = () => {
        this.sendToServer("ClearWhiteboard",{room:this.roomId});
    }

    render() {
        let button = null;
        if(this.props.isHost){
            button = <Button onClick={this.showEndConfirm} ghost>
                End Meeting
            </Button>
            } else {
            button = <Button onClick={this.showLeaveConfirm} ghost>
                Leave Meeting
            </Button>
        }
        console.log(this.userName)

        switch(this.state.isChat) {
            case true:
                return (
                    <Layout className="video_room">
                        <Header sytle={{height:40}}>
                        <   div>
                                <p style={{float:"left", color:"white"}}>RoomID:  {this.roomId}</p>
                                <p style={{float:"right", color:"white"}}>Hi, {this.userName}</p>
                            </div> 
                        </Header>

                        <Content>
                          
                            <div>
                                <Row>
                                    {this.remoteRefList.map((item) => 
                                        <Col span = {24/this.state.numGuest}>
                                            <video 
                                                className = 'App'
                                                ref = {item}
                                                style = {{
                                                    width: 200,
                                                    height: 200,
                                                    margin: 5,
                                                    backgroundColor: 'balck'
                                                }}
                                                autoPlay
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </div>

                            <div>
                                <div style={{display:"inline-block"}}>
                                <video ref={ this.localVideoref }
                                    style={{
                                    width: 320,
                                    height: 320,
                                    margin: 5,
                                    backgroundColor: 'black',
                                    display:"inline-block"
                                    }}
                                    autoPlay>
                                </video>
                                </div>
                                <Whiteboard style={{
                                    width: 500,
                                    height: 320,
                                    margin: 5,
                                    backgroundColor: 'black',
                                    border:"5px solid grey"
                                    }} 
                                    onChange = {this.pointsUpdate}
                                    canvasUpdate = {this.canvasUpdate}
                                    clear = {this.clearRemoteWhiteboard}
                                />
                                <div id="chatPannel">
                                    <div style={{width:400, height:120, overflow:"auto"}}>
                                    <p>history messages:</p> 
                                    {this.messages.map((item) => 
                                        <ul style = {{width:400}}>
                                            <li>{item}</li>
                                        </ul> 
                                    )}
                                    </div>
                                    
                                    <ul style = {{width:400, height:170, overflow:"auto"}} id="chatList"  /> 
                                
                                    <div style={{display:"inline-block"}}>
                                        <input style = {{width: 300}} type="text" id="chatInput" size="median" />
                                        <Button id="chatSend" onClick={this.chatSend}>
                                            Send
                                        </Button>
                                    </div>                          
                                </div>  
                            </div>
                            
                                
                        </Content>

                        <Footer style={{backgroundColor:"black", height:80}}>
                            <div>
                                <div style={{display:"inline-block", float:"left"}}>
                                    <Button onClick={this.toggleMute} id="muteSelfBtn" ghost>
                                        Mute
                                    </Button>

                                    {/* <Button ghost>
                                        Stop Video
                                    </Button> */}
                                </div>

                                <div style={{display:"inline-block", float:"right"}}>
                                    {button}
                                </div>



                                <div style={{display:"inline-block", margin:"0 10%"}}>
                                    <Button onClick={this.getInviteUrl} id="InvBtn" ghost>
                                        Invite
                                    </Button>

                                    <Button onClick={this.screenSharing} id="ssBtn" ghost>
                                        Screen Share
                                    </Button>

                                    <Button onClick={this.noChat} id="chatBtn" ghost>
                                        Chat
                                    </Button>

                                    <Button onClick={this.handsUp} ghost>
                                        Hands Up
                                    </Button>
                                </div>

                            </div>

                        </Footer>
                    </Layout>
                )
            case false:
                return (
                    <Layout className="video_room">
                        <Header sytle={{height:40}}>
                            <div>
                                <p style={{float:"left", color:"white"}}>RoomID:  {this.roomId}</p>
                                <p style={{float:"right", color:"white"}}>Hi, {this.userName}</p>
                           </div> 
                        </Header>
        
                        <Content>
        
                            <div>
                                <Row>
                                    {this.remoteRefList.map((item) => 
                                        <Col span = {24/this.state.numGuest}>
                                            <video 
                                                className = 'App'
                                                ref = {item}
                                                style = {{
                                                    width: 200,
                                                    height: 200,
                                                    margin: 5,
                                                    backgroundColor: 'balck'
                                                }}
                                                autoPlay
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </div>
        
                            <div>
                                <div style={{display:"inline-block"}}>
                                <video ref={ this.localVideoref }
                                    style={{
                                    width: 320,
                                    height: 320,
                                    margin: 5,
                                    backgroundColor: 'black',
                                    display:"inline-block"
                                    }}
                                    autoPlay>
                                </video>
                                </div>
                                <Whiteboard style={{
                                    width: 500,
                                    height: 320,
                                    margin: 5,
                                    backgroundColor: 'black',
                                    border:"5px solid grey"
                                    }} 
                                    onChange = {this.pointsUpdate}
                                    canvasUpdate = {this.canvasUpdate}
                                    clear = {this.clearRemoteWhiteboard}
                                />
                            </div> 
                        </Content>
        
                        <Footer style={{backgroundColor:"black", height:80}}>
                            <div>
                                <div style={{display:"inline-block", float:"left"}}>
                                    <Button onClick={this.toggleMute} id="muteSelfBtn" ghost>
                                        Mute
                                    </Button>
        
                                    {/* <Button ghost>
                                        Stop Video
                                    </Button> */}
                                </div>
        
                                <div style={{display:"inline-block", float:"right"}}>
                                    {button}
                                </div>
        
        
        
                                <div style={{display:"inline-block", margin:"0 10%"}}>
                                    <Button onClick={this.getInviteUrl} id="InvBtn" ghost>
                                        Invite
                                    </Button>
        
                                    <Button onClick={this.screenSharing} id="ssBtn" ghost>
                                        Screen Share
                                    </Button>
        
                                    <Button onClick={this.chat} id="chatBtn" ghost>
                                        Chat
                                    </Button>
        
                                    <Button onClick={this.handsUp} ghost>
                                        Hands Up
                                    </Button>
                                </div>
        
                            </div>
        
                        </Footer>
                    </Layout>
                )
        }
    }
} 

export default Room;
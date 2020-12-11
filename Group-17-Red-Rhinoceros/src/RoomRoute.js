import React, { Component } from "react";
import io from 'socket.io-client'
import Room from "./Room";
import {Button, Input} from "antd";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      join:false,
      inRoom: false, 
    };
    this.roomId = null; 
    this.type = null; 
    this.isHost = false;
    this.userName = null
  }

  componentDidMount = () => {
    this.socket = io(
      '/admin',
      {
        path: '/webrtc',
        query: {}
      }
    )

    this.socket.on('connection-success', success => {
      console.log('connection success')
    })

    this.socket.on('joinAccept', data => {
      console.log(data.message)
      this.userName = document.getElementById("nameTf").value
      this.roomId = document.getElementById("roomTf").value 
      this.type = "join"
      this.setState({ inRoom: true });
    })

    this.socket.on('joinReject', data => {
      alert(data.message); 
      console.log(data.message)
    })
  };

  sendToServer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload
    })
  }

  joinRoom = () => {
    console.log('clicked')
    var joinData = { 
      room: document.getElementById("roomTf").value
    }
    this.sendToServer("checkJoin", joinData)
  };

  joinState = () => {
    this.setState({ join: true});
  };



  render() {
    switch (this.state.inRoom) {
      case true:
        return (
          <div>
            <Room type = {this.type} roomId = {this.roomId} userName = {this.userName} isHost = {this.isHost}/>
          </div>
        );
      case false:
        switch(this.state.join) {
          case false:
            return (
              <div className = "App">
              <br/>
              <br/>                
              <h1 >Welcome to Red Rhinoceros! </h1>
              <br/>
              <p > please enter your name </p>
              <Input style = {{width: '30%'}} type="text" id="nameTf" size = "median"/>
              <br/>
              <br/>
              <Button type = "primary" onClick={this.joinState} id="jointBtn">
                JOIN ROOM
              </Button>
            </div>
            )
          case true:
            return (
              <div className = "App">
              <br/>
              <br/>                
              <h1 >Welcome to Red Rhinoceros! </h1>
              <br/>
              <p > please enter your name </p>
              <Input style = {{width: '30%'}} type="text" id="nameTf" size = "median"/>
              <br/>
              <br/>
              <p > please enter room number and confirm</p>
              <Input style = {{width: "30%"}} type="text" id = "roomTf" size = "median"/>
              <Button type = "primary" onClick={this.joinRoom} id="jointBtn">
                CONFIRM
              </Button>
            </div>
            )

        }
      default:
        return (
          <div id="error">
            <h1> this really should not happen </h1>
          </div>
        );
    }
  }
}
export default App;
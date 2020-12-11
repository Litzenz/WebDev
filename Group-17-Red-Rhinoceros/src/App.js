import React, { Component } from "react";

import {Button} from "antd";
import './App.css';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {

    render() { 
        return ( 
            <BrowserRouter>
            <div style={{textAlign:"center"}}>
            <div>
                <h1 style={{margin:80}}>Welcome to Red Rhinoceros!</h1>
            </div>

            <div style={{width:300, height:300, display:"inline-block"}}>
                <Button
                    type = "primary" block
                    onClick={()=>this.props.history.push('/join')} 
                    id="roomroute"
                    >
                        Join a Meeting
                </Button>
                <br/>
                <br/>
               <Button 
                    type = "primary" block
                    onClick={()=>this.props.history.push('/signin')} 
                    id="signin"
                    >
                        SIGN IN
                </Button>
            </div>
            </div>

            </BrowserRouter>
           
         );

    }
}
 
export default App;
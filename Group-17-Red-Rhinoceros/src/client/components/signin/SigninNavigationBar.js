import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'



class NavigationBar extends Component {
    
    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    render() {
        return (
            <header>
            <div > 
                <div style={{float:"left"}}>
                    <h1 style={{color:"white"}}>Red Rhinoceros</h1>
                </div>
                <div style={{float:"left"}}>
                    <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="tohome">
                        <Link to="/">Home </Link>
                    </Menu.Item>
                    <Menu.Item key="tosignin" disabled>
                        <Link to="/signin">Sign In<span className="sr-only">(current)</span></Link>
                    </Menu.Item>

                    <Menu.Item key="tosignup">
                        <Link to="/signup">Sign Up</Link>
                    </Menu.Item>

                    </Menu>                    
                </div>
            </div>
            </header>
        )
    }
}

export default NavigationBar;
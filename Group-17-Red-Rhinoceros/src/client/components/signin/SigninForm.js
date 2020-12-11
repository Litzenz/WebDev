import React, { Component } from 'react'
import { BrowserRouter, Link, withRouter, Redirect } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {connect} from 'react-redux'
import {signin} from '../../../redux/actions'
import reducer from '../../../reducers/index'
import { createStore } from 'redux'

const store = createStore(reducer)

class SigninForm extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onSubmit = values => {
        this.props.signin(values)
    }

    render() {
        const {msg, redirectTo, username} = this.props.user
        if(redirectTo){
          return <Redirect to={{pathname:redirectTo, state:{username:username}}}/>
        }

        return (
            <BrowserRouter>

            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={this.onSubmit}
            style={{maxWidth: 300, margin: "0px auto" }}
            >

            {/* Show err msg */}
            {msg ? <div className="err-msg">{msg}</div> : null}

            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input 
                value={this.state.username} onChange={this.onChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="username" 
                placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                value={this.state.password} onChange={this.onChange}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link onClick={()=>this.props.history.push('/agreement')}>Forgot password</Link>

            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Log in
                </Button>
                Or <Link onClick={()=>this.props.history.push('/signup')}>register now!</Link>
            </Form.Item>
            </Form>

            </BrowserRouter>

        )
    }
}

export default connect (
    state => ({user:state.user}),
    {signin}
  )
  (withRouter(SigninForm))
  

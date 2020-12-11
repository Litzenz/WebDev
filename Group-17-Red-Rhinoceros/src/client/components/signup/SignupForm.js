import React, { Component } from 'react'
import {Form, Button, Input, Checkbox} from 'antd'
import { BrowserRouter, Link, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../../redux/actions'
import reducer from '../../../reducers/index'
import { createStore } from 'redux'
import '../../../css/index.less'

const store = createStore(reducer)

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {          
        }
    }

    onFinish = values => {
      this.props.register(values)
    }


    render() {
      const {msg, redirectTo, username} = this.props.user
      if(redirectTo){
        return <Redirect to={{pathname:redirectTo, state:{username:username}}}/>
      }
        return (
          <BrowserRouter>
            <Form
            name="register"
            style={{maxWidth: 400, margin: "5px auto" }}
            history={this.props.history}
            onFinish={this.onFinish}            
            >

            {/* Show err msg */}
            {msg ? <div className="err-msg">{msg}</div> : null}
            
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
              
            >
              <Input.Password />
            </Form.Item>
      
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
      
            <Form.Item
              name="agreement"
              valuePropName="checked"
            >
              <Checkbox>
                I have read the <Link onClick={()=>this.props.history.push('/agreement')}>agreement</Link>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          </BrowserRouter>
        )
    }
}

export default connect (
  state => ({user:state.user}),
  {register}
)
(withRouter(SignupForm))


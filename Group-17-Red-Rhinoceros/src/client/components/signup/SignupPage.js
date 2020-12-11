import React, { Component } from 'react'
import SignupForm from './SignupForm'
import { Layout} from 'antd'
import NavigationBar from './NavigationBar'

const {Header, Content} = Layout

class SignupPage extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <NavigationBar />
                </Header>
                <Content style={{margin:150}}>
                    <SignupForm />
                </Content>
            </Layout>

        )
    }
}

export default SignupPage

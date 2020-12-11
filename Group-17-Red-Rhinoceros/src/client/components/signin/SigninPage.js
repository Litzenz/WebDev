import React, { Component } from 'react'
import SigninForm from './SigninForm'
import { Layout} from 'antd'
import SinginNavigationBar from './SigninNavigationBar'

const {Header, Content} = Layout

class SigninPage extends Component {

    componentDidMount() {
        console.log(this.props.location)
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <SinginNavigationBar />
                </Header>
            <Content style={{margin:150}}>
                <SigninForm />
            </Content>
        </Layout>


        )
    }
}

export default SigninPage

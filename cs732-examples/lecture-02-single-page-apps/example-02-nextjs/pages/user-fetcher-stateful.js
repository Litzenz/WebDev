import fetch from 'isomorphic-unfetch';
import React from 'react';

class UserFetcher extends React.Component {

    static async getInitialProps() {
        const response = await fetch("https://trex-sandwich.com/ajax/users?id=3");
        const user = await response.json();
        console.log("user", user);
        return { user }
    }

    render() {
        console.log("props", this.props);
        const user = this.props.user;
        return <p>User name: {user.first_name} {user.last_name}</p>
    }
}

export default UserFetcher;
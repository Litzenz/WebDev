import React from 'react';

export default class GreetingLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    loadGreeting() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(json => this.setState({ greeting: json.greeting, err: null }))
            .catch(err => this.setState({ err, greeting: null }));
    }

    render() {
        return (
            <div>
                <div><button onClick={() => this.loadGreeting()}>Load greeting</button></div>
                {this.state.greeting && <p>{this.state.greeting}</p>}
                {this.state.err && <p style={{ color: 'red' }}>{this.state.err}</p>}
            </div>
        );
    }
}
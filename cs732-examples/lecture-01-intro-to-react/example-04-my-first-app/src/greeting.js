import React from 'react';

/**
 * A Greeting is a React compoment which renders a single <p>, displaying the
 * firstName and lastName supplied in the Greeting's properties.
 */
class Greeting extends React.Component {

    constructor(props) {
        super(props);
        // TODO Initialize any state here
    }

    render() {
        return (
            <p>Hello {this.props.firstName} {this.props.lastName}!</p>
        );
    }
}

/* This shows the same thing, as a functional component. */
// function Greeting(props) {
//     return (
//         <p>Hello {props.firstName} {props.lastName}!</p>
//     );
// }

export default Greeting;
import React from 'react';

/**
 * A Counter is a button which keeps track of - and displays - the number of times it has been clicked.
 */
export default class Counter extends React.Component {

    /**
     * Creates a new Counter. Here, we initialize the state variable.
     * The consructor is the *only* place where we are allowed to directly set the state.
     * In all other locations, setState() must be used.
     */
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    /**
     * This function will add one to the counter value.
     * As can be seen, we don't directly alter the state variable, but rather, use the setState() function to
     * specify what the new state should be.
     */
    updateCounter() {
        this.setState((state, props) => ({
            count: state.count + 1
        }));
    }

    /**
     * Renders a a button which displays the current count. On click, we call the updateCounter() function.
     * We use the arrow function syntax here for event handling so "this" is appropriately in-scope.
     */
    render() {
        return (
            <button onClick={() => this.updateCounter()}>Count: {this.state.count}</button>
        );
    }

}
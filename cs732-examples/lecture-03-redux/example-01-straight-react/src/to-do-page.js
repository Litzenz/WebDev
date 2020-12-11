import React from 'react';
import { ColumnLayout, Column } from './layout-components/column-layout';
import Card from './layout-components/card';
import ToDoList from './components/to-do-list';

/**
 * Maintains a list of to-do items, each of which have a `text` description, and a
 * Boolean flag indicating whether or not they are `completed`. Additionally renders components
 * allowing users to view and interact with to-do items.
 */
export default class ToDoPage extends React.Component {

    /**
     * Creates the component and sets the initial state with some dummy data
     */
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                { text: "Do stuff", completed: false },
                { text: "Do things", completed: true },
                { text: "Do more stuff", completed: false },
                { text: "Do more things", completed: false },
                { text: "Procrastinate", completed: true }
            ]
        }
    }

    /**
     * Modifies the state of this component by changing the completed status of the to-do item
     * at the given index.
     * 
     * @param index The index of the to-do item to change
     * @param isComplete the new completed status of that to-do item
     */
    setComplete(index, isComplete) {
        this.setState(state => ({
            todos: state.todos.map((item, itemIndex) => {
                if (index === itemIndex) {
                    return Object.assign({}, item, {
                        completed: isComplete
                    });
                }
                return item;
            })
        }));
    }

    /**
     * Modifies the state of this component by adding a new to-do item with the given text.
     * 
     * @param text The text of the new to-do item
     */
    addTodo(text) {
        this.setState(state => ({
            todos: [
                ...state.todos,
                {
                    text,
                    completed: false
                }
            ]
        }));
    }

    /**
     * Renders this component in a two-column layout. The first column displays the to-do items in a list, while
     * allowing their completed status to be toggled. The second column contains a summary of how many items are
     * complete / incomplete.
     */
    render() {

        const numCompleted = this.state.todos.filter(todo => todo.completed).length;
        const numIncomplete = this.state.todos.length - numCompleted;

        return (
            <ColumnLayout columns="1fr 300px">

                <Column>
                    <ToDoListCard todos={this.state.todos} onSetComplete={e => this.setComplete(e.index, e.isComplete)} />
                </Column>

                <Column>
                    <SummaryCard numCompleted={numCompleted} numIncomplete={numIncomplete} />
                </Column>
            </ColumnLayout>
        );
    }

}

/**
 * Renders a Card containing a ToDoList displaying the given items.
 * 
 * @param todos The to-do items to display
 * @param onSetComplete The event handler to be called when the completed status of an item should be changed
 */
function ToDoListCard({ todos, onSetComplete }) {
    return (
        <Card title="My To-Dos">
            <ToDoList todos={todos} onSetComplete={e => onSetComplete(e)} />
        </Card>
    );
}

/**
 * Renders a Card containing information about the number of complete / incomplete to-do items.
 * 
 * @param numCompleted The number of completed to-do items
 * @param numIncomplete The number of incomplete to-do items
 */
function SummaryCard({ numCompleted, numIncomplete }) {
    return (
        <Card title="Summary">
            <p>Completed items: <strong>{numCompleted}</strong></p>
            <p>Still to-do: <strong>{numIncomplete}</strong></p>
        </Card>
    );
}
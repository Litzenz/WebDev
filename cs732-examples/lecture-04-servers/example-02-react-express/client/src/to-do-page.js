import React from 'react';
import { ColumnLayout, Column } from './layout-components/column-layout';
import Card from './layout-components/card';
import Dialog from './layout-components/dialog'
import ToDoList from './components/to-do-list';
import { connect } from 'react-redux';
import { addTodo, setTodoComplete } from './redux/actions';
import { Switch, Route, withRouter } from 'react-router-dom';
import styles from './to-do-page.module.css';

class ToDoPage extends React.Component {

    /**
     * Creates a new ToDoPage and sets its internal state, which keeps track of the contents of the "new to-do"
     * dialog, to a default value.
     * 
     * Note: This is an example of where it can be OK to store some local state like this, in addition to using Redux.
     * The contents of that text box will absolutely in no way ever be needed outside of this ToDoPage, and it doesn't
     * really matter if its value gets lost e.g. when we switch pages, so storing it as local state rather than adding
     * it to the Redux store is absolutely fine.
     */
    constructor(props) {
        super(props);
        this.state = {
            newTodoText: ""
        };
    }

    /**
     * Handles a click event on any of the buttons on the "new to-do" dialog box.
     * 
     * @param buttonName The name of the button that was clicked.
     */
    handleDialogButtonClick({ buttonName }) {

        const { addTodo, history } = this.props;

        if (buttonName === "Ok" && this.state.newTodoText) {
            addTodo(this.state.newTodoText);
        }
        this.setState({ newTodoText: "" });
        history.goBack();
    }

    /**
     * Renders a two-column layout. The first column displays the to-do items in a list, while
     * allowing their completed status to be toggled. The second column contains a summary of how many items are
     * complete / incomplete.
     * 
     * In addition, if the path is "/add", a Dialog will be rendered allowing the user to add a new to-do item.
     */
    render() {

        /**
         * Grabbing useful bits & pieces out of this.props.
         * 
         * "history" is a React Router object that allows us to programmatically do client-side navigation. See
         * below for an example of how it works.
         */
        const { match, todos, setTodoComplete, history } = this.props;
        const { url, path } = match;

        const numCompleted = todos.filter(todo => todo.completed).length;
        const numIncomplete = todos.length - numCompleted;

        return (
            <>
                <ColumnLayout columns="1fr 300px">

                    <Column>
                        {/* When the "Add" button is clicked, we will navigate to /add. */}
                        <ToDoListCard
                            todos={todos}
                            onSetComplete={e => setTodoComplete(e.index, e.isComplete)}
                            onNewTodoClick={e => history.push(`${url}/add`)} />
                    </Column>

                    <Column>
                        <SummaryCard numCompleted={numCompleted} numIncomplete={numIncomplete} />
                    </Column>
                </ColumnLayout>

                {/* If we're navigated to /add, then we'll render a Dialog box that allows us to add new items. */}
                <Switch>
                    <Route exact path={`${path}/add`}>
                        <Dialog title="New to-do" buttons={["Ok", "Cancel"]} onButtonClick={e => this.handleDialogButtonClick(e)}>
                            <div className={styles.addTodoForm}>
                                <label>Text:</label>
                                <input
                                    type="text"
                                    value={this.state.newTodoText}
                                    onChange={e => this.setState({ newTodoText: e.target.value })} />
                            </div>
                        </Dialog>
                    </Route>
                </Switch>
            </>
        );
    }
}

// This code connects TodoPage to the Redux store.
// -------------------------------------------------------------
/**
 * This function will configure the ToDoPage to have the to-do list from the Redux store
 * accessible via a prop called "todos".
 * 
 * @param state The entire Redux state tree
 */
function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

/**
 * This object will configure the ToDoPage to have a property called "setTodoComplete".
 * That property will be a function which will dispatch the Redux action with the same name
 * to the store.
 */
const mapDispatchToProps = {
    addTodo,
    setTodoComplete
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToDoPage));
// -------------------------------------------------------------

/**
 * Renders a Card containing a ToDoList displaying the given items.
 * 
 * @param todos The to-do items to display
 * @param onSetComplete The event handler to be called when the completed status of an item should be changed
 */
function ToDoListCard({ todos, onSetComplete, onNewTodoClick }) {
    return (
        <Card title="My To-Dos">
            <ToDoList todos={todos} onSetComplete={e => onSetComplete(e)} />
            <div className="flex-row-end" style={{ marginTop: "var(--half-spacing)" }}>
                <button onClick={e => onNewTodoClick(e)}>Add Todo</button>
            </div>
        </Card >
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
import React from 'react';
import { loadUsersThunk, loadUserByUsernameThunk } from '../redux/actions/thunks';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, withRouter, useParams } from 'react-router-dom';
import UserList from '../components/user-list';
import UserCard from '../components/user-card';
import UserPetsCard from '../components/user-pets-card';

class UsersPage extends React.Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {

        const { path } = this.props.match;

        if (this.props.users && this.props.users[0]) {
            return (
                <Container fluid>
                    <Row>
                        <Col xs="auto">
                            <UserList users={this.props.users} />
                        </Col>
                        <Col>
                            <Switch>
                                <Route exact path={path}>
                                    <UserCard user={this.props.users[0]} />
                                    <PetsCardLoadPets user={this.props.users[0]} loadUserByUsername={this.props.loadUserByUsername} />
                                </Route>
                                <Route path={`${path}/:username`}>
                                    <UserCardWithParams users={this.props.users} />
                                    <PetsCardWithParams users={this.props.users} loadUserByUsername={this.props.loadUserByUsername} />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return <p>Loading users...</p>
        }
    }
}

function UserCardWithParams({ users }) {
    const { username } = useParams();
    return <UserCard user={users.find(u => u.username === username)} />
}

function PetsCardWithParams({ users, loadUserByUsername }) {
    const { username } = useParams();
    return <PetsCardLoadPets user={users.find(u => u.username === username)} loadUserByUsername={loadUserByUsername} />
}

function PetsCardLoadPets({ user, loadUserByUsername }) {
    if (user.registeredPets && user.registeredPets[0] && !user.registeredPets[0]._id) {
        loadUserByUsername(user.username);
    }
    return <UserPetsCard pets={user.registeredPets} />
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

const mapDispatchToProps = {
    loadUsers: loadUsersThunk.thunk,
    loadUserByUsername: loadUserByUsernameThunk.thunk
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersPage));
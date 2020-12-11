import React from 'react';
import { Media } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';

export default function UserList({ users }) {

    const { url } = useRouteMatch();
    console.log('url', url)

    return (
        <ul className="list-unstyled">
            {users.map((user, index) => (
                <Media key={index} as="li">
                    <img width={64} height={64} className="mr-3" src="/user.svg" alt="meow" />
                    <Media.Body>
                        <Link to={`${url}/${user.username}`}><h5>{user.username}</h5></Link>
                        <p>Number of pets: {user.registeredPets.length}</p>
                    </Media.Body>
                </Media>
            ))}
        </ul>
    )
}
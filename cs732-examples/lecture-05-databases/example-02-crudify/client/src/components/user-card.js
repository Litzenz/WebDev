import React from 'react';
import { Card, Table } from 'react-bootstrap';
import moment from 'moment';

export default function UserCard({ user }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>User Details</Card.Title>
                <Table>
                    <tbody>
                        <tr><th>Username:</th><td>{user.username}</td></tr>
                        <tr><th>First name:</th><td>{user.firstName}</td></tr>
                        <tr><th>Last name:</th><td>{user.lastName}</td></tr>
                        <tr><th>Gender:</th><td>{user.gender}</td></tr>
                        <tr><th>Date of birth:</th><td>{moment(user.dateOfBirth).format('MMMM Do, YYYY')}</td></tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}
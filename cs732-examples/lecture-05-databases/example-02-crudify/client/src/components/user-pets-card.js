import React from 'react';
import { Card, Table } from 'react-bootstrap';
import moment from 'moment';

export default function UserPetsCard({ pets }) {

    if (pets && pets[0] && pets[0]._id) {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Pets</Card.Title>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Registration #</th>
                                <th>Name</th>
                                <th>Species &amp; Breed</th>
                                <th>Initial registration date</th>
                                <th>Neutered?</th>
                                <th>Registration expires</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, index) => (
                                <tr key={index}>
                                    <td><img width={64} height={64} src={`/${pet.breed.toLowerCase()}(${pet.species.toLowerCase()}).jpg`} /></td>
                                    <td>{pet.number}</td>
                                    <td>{pet.name}</td>
                                    <td>{pet.breed} ({pet.species})</td>
                                    <td>{moment(pet.initialRegistrationDate).format('MMMM Do, YYYY')}</td>
                                    <td>{pet.isNeutered ? 'Yes' : 'No'}</td>
                                    <td>{moment(pet.expiryDate).fromNow()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
    else {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>No Pets</Card.Title>
                    <Card.Text>No pets to show :(</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
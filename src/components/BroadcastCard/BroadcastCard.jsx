import React from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BroadcastCard = () => {
    return (
        <Col sm={8} md={6} lg={4} className='mb-4 mx-auto m-md-0'>
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BroadcastCard;
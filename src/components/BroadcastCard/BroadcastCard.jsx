import React from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const BroadcastCard = (props) => {
    const {broadcastData} = props;
    console.log(broadcastData)


    return (
        <Col sm={8} md={6} lg={4} className='mb-4 mx-auto m-md-0'>
            <Card>
                <Card.Header>{broadcastData.name}, {broadcastData.sys.country}</Card.Header>
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
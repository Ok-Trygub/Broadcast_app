import React from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";


const BroadcastCard = (props) => {
    const {broadcast} = props;

    const {citiesGeopositions} = useSelector(state => state.cities);
    const currentCityGeoData = citiesGeopositions.find(item => item.lon.toFixed(2) === broadcast.coord.lon.toFixed(2));


    return (
        <Col sm={8} md={6} lg={4} className='mb-4 mx-auto m-md-0'>
            <Card>
                <Card.Header>{currentCityGeoData.name}, {currentCityGeoData.state}, {currentCityGeoData.country}</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        {broadcast.id}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BroadcastCard;
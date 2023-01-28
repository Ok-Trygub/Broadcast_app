import React from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import './BroadcastCard.css';


const BroadcastCard = (props) => {
    const {broadcast} = props;

    const {citiesGeopositions} = useSelector(state => state.cities);
    const currentCityGeoData = citiesGeopositions.find(item => item.lon.toFixed(2) === broadcast.coord.lon.toFixed(2));

    return (
        <Col sm={8} md={6} lg={4} className='pb-4 mx-auto m-md-0'>
                <Card className='border-0'>
                    <Card.Header
                        className='cardHeader'>{currentCityGeoData.name}, {currentCityGeoData.state} {currentCityGeoData.state ? ',' : null} {currentCityGeoData.country}</Card.Header>
                    <Card.Body>
                        <Card.Title className='text-capitalize pb-2'>{broadcast.weather[0].description}</Card.Title>
                        <ul className='card-text pb-4'>
                            <li className='pb-1'>Temperature: <span
                                className='weight-bold'>{broadcast.main.temp} ℃</span></li>
                            <li>Feels like: <span className='weight-bold'>{broadcast.main.feels_like} ℃</span></li>
                        </ul>
                        <Button variant="warning" className='weight-bold'>Update</Button>
                    </Card.Body>
                </Card>
        </Col>

    );
};

export default BroadcastCard;
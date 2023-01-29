import {React, useState} from 'react';
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {fetchCurrentBroadcast} from "../../store/slices/generalBroadcast";
import {useSelector, useDispatch} from "react-redux";
import './BroadcastCard.css';
import Loader from "../Loader/Loader";


const BroadcastCard = (props) => {
    const {broadcast} = props;
    // console.log(broadcast)

    const dispatch = useDispatch();
    const {citiesGeopositions} = useSelector(state => state.cities);
    const {currentBroadcastStatus} = useSelector(state => state.broadcasts);
    const currentCityGeoData = citiesGeopositions.find(item => item.lon.toFixed(2) === broadcast.coord.lon.toFixed(2));
    const [update, setUpdate] = useState(false);


    const updateBroadcast = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(fetchCurrentBroadcast(currentCityGeoData));
        setUpdate(true);
    }

    const renderLoader = () => {
        setTimeout(setUpdate, 1000, false)
        return (
            <div className='mx-auto cardLoader mt-4'><Loader/></div>
        )
    }


    return (
        <Col sm={8} md={6} lg={4} className='pb-4 mx-auto m-md-0'>
            <Card className='border-0 bg-transparent'>
                <Card.Header
                    className='cardHeader'>{currentCityGeoData.name}, {currentCityGeoData.state} {currentCityGeoData.state ? ',' : null} {currentCityGeoData.country}</Card.Header>

                {currentBroadcastStatus === 'loading' && update === true ?
                    renderLoader()
                    :
                    <Card.Body>
                        <Card.Title className='text-capitalize pb-2'>{broadcast.weather[0].description}</Card.Title>
                        <ul className='card-text pb-4'>
                            <li className='pb-1'>Temperature: <span
                                className='weight-bold'>{broadcast.main.temp} ℃</span></li>
                            <li>Feels like: <span className='weight-bold'>{broadcast.main.feels_like} ℃</span></li>
                            {broadcast.test ?
                                <li>Test: <span className='weight-bold'>{broadcast.test} ℃</span></li> : null}

                        </ul>
                        <Button variant="warning" className='weight-bold' onClick={updateBroadcast}>Update</Button>
                    </Card.Body>
                }
            </Card>
        </Col>
    );
};

export default BroadcastCard;
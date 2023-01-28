import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import BroadcastCard from '../../components/BroadcastCard/BroadcastCard';
import {fetchCitiesGeoposition} from '../../store/slices/cities';
import {fetchBroadcast} from "../../store/slices/generalBroadcast";
import {getCitiesGeoposition} from "../../utils/Storage";
import {addCitiesGeopositions} from '../../store/slices/cities'
import './MainPage.css';
import Search from "../../assets/icons/Search";
import Loader from "../../components/Loader/Loader";

const MainPage = () => {
    const dispatch = useDispatch();
    const {broadcasts, broadcastStatus} = useSelector(state => state.broadcasts);
    const {citiesStatus} = useSelector(state => state.cities);
    const {citiesGeopositions} = useSelector(state => state.cities);
    const [currentCity, setCurrentCity] = useState('');


    useEffect(() => {
        const dataFromStorage = getCitiesGeoposition();

        if (!dataFromStorage) return;
        dispatch(addCitiesGeopositions(dataFromStorage));
    }, [dispatch])


    useEffect(() => {
        if (!citiesGeopositions.length) return;
        dispatch(fetchBroadcast(citiesGeopositions));
    }, [dispatch, citiesGeopositions]);


    const setCity = ({target}) => {
        setCurrentCity(target.value);
    }

    const searchHandle = (event) => {
        event.preventDefault();

        if (!currentCity) return;
        dispatch(fetchCitiesGeoposition(currentCity));
        setCurrentCity('');
    }


    return (
        <main className='container mt-5'>
            <Row>
                <Col sm={6} xl={4} className='mx-auto'>
                    <InputGroup className="mb-5">
                        <Form.Control aria-label="input" onChange={setCity} value={currentCity}/>
                        <InputGroup.Text onClick={searchHandle}><Search/></InputGroup.Text>
                    </InputGroup>

                    {!broadcastStatus &&
                        <p className='text-white search-tip'>Input in the search field the name of the city which weather forecast
                            you would like to receive. <br/> For example: <b>"Odesa"</b>. <br/> <br/>You can specify the city not only in English.
                            <br/>The search is also carried out by state code
                            and country code.</p>
                    }
                </Col>
            </Row>

            {broadcastStatus === 'loading' && <div className='mx-auto mt-6 loader'><Loader/></div>}
            {broadcastStatus === 'resolved' &&
                <Row>
                    {broadcasts.map((broadcast, index) => (
                        <BroadcastCard
                            key={index}
                            broadcast={broadcast}
                        />
                    ))}
                </Row>
            }

            {broadcastStatus === 'rejected' &&
                <p className='text-white text-center errorText'>The error is occurred. Please try again.</p>}
            {citiesStatus === 'rejected' &&
                <p className='text-white text-center errorText'>Something went wrong... Please try again.</p>}
        </main>
    );
};

export default MainPage;
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import BroadcastCard from '../../components/BroadcastCard/BroadcastCard';
import {fetchCitiesGeoposition} from '../../store/slices/cities';
import {fetchBroadcast} from "../../store/slices/generalBroadcast";

const MainPage = () => {
    const dispatch = useDispatch();
    const {broadcasts} = useSelector(state => state.broadcasts);
    const {citiesGeopositions} = useSelector(state => state.cities);
    // console.log(citiesGeopositions)
    // console.log(broadcasts)

    const [currentCity, setCurrentCity] = useState('');


    useEffect(() => {
        if (!citiesGeopositions.length) return;
        dispatch(fetchBroadcast(citiesGeopositions))
    }, [dispatch, citiesGeopositions])


    const setCity = ({target}) => {
        setCurrentCity(target.value);

    }

    const searchHandle = (event) => {
        event.preventDefault();

        dispatch(fetchCitiesGeoposition(currentCity));
        setCurrentCity('');
    }


    return (
        <main className='container mt-5'>
            {/*{status === 'loading' && <h2>Loading...</h2>}*/}
            {/*{error && <h2>Next error: {error}</h2>}*/}

            <Row>
                <Col sm={6} xl={4} className='mx-auto'>
                    <InputGroup className="mb-5">
                        <Form.Control aria-label="input" onChange={setCity} value={currentCity}/>
                        <InputGroup.Text onClick={searchHandle}>.00</InputGroup.Text>
                    </InputGroup>

                </Col>
            </Row>


            <Row>

                {broadcasts.map((broadcast, index) => (
                    <BroadcastCard
                        key={index}
                        broadcast={broadcast}
                    />
                ))}

            </Row>
        </main>
    );
};

export default MainPage;
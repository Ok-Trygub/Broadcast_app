import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "../../store/slices/generalBroadcast";
import {Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import BroadcastCard from '../../components/BroadcastCard/BroadcastCard';

const MainPage = () => {
    const dispatch = useDispatch();
    const {status, error, todos} = useSelector(state => state.generalBroadcast);

    const [currentCity, setCurrentCity] = useState('');
    console.log(currentCity)

    // useEffect(() => {
    //     dispatch(fetchTodos())
    // }, [dispatch])
    //
    // console.log(todos)


    const setCity = (event) => {
        setCurrentCity(event.target.value);
    }

    const searchHandle = (event) => {
        event.preventDefault();


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
                <BroadcastCard/>
            </Row>
        </main>
    );
};

export default MainPage;
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
    return (
        <Spinner animation="border" variant="warning"  className='w-100 h-100'/>
    );
};

export default Loader;
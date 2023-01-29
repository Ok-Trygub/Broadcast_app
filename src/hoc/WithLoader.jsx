import React from 'react';
import Loader from "../components/Loader/Loader";

const WithLoader = (isLoading) => {
    return (props) => {
        return (
            <>
                {isLoading === 'loading' ? <Loader/> :


                    'dsdsds'}
            </>
        )
    }
};

export default WithLoader;
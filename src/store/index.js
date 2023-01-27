import {configureStore} from '@reduxjs/toolkit';
import broadcasts from './slices/generalBroadcast';
import cities from "./slices/cities";

export default configureStore({
    reducer: {
        broadcasts: broadcasts,
        cities: cities
    }
});
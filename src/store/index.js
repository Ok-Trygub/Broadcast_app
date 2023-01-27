import {configureStore} from '@reduxjs/toolkit';
import generalBroadcast from './slices/generalBroadcast';
import cities from "./slices/cities";

export default configureStore({
    reducer: {
        generalBroadcast: generalBroadcast,
        cities: cities
    }
});
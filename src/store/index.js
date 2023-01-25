import {configureStore} from '@reduxjs/toolkit';
import generalBroadcast from './slices/generalBroadcast';

export default configureStore({
    reducer: {
        generalBroadcast: generalBroadcast
    }
});
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contacts';

export default configureStore({
    reducer: {
        contacts: contactsReducer
    }
});
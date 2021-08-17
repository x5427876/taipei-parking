import { configureStore } from '@reduxjs/toolkit';
import locationReudcer from './travelSlice'

export default configureStore({
    reducer: {
        location: locationReudcer
    },
});
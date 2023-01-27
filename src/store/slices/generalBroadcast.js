import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../utils/API_CONFIG';


export const fetchCitiesGeoposition = createAsyncThunk(
    'generalBroadcast/fetchCitiesGeoposition',
    async function (currentCity, {rejectWithValue, dispatch}) {

        dispatch(addCity(currentCity));

        try {
            const response = await fetch(`${API_BASE_URL}geo/1.0/direct?q=${currentCity}&limit=5&appid=ba63aad5cef0cee38d4091641a095fbe`);
            const data = await response.json();
            return data
        } catch (err) {
            return rejectWithValue('Server Error!');
        }
    },
    {
        condition: (_, {getState}) => {
            const {generalBroadcast} = getState();
            if (generalBroadcast.citiesStatus === 'loading') return false;
        }
    }
)


export const fetchBroadcast = createAsyncThunk(
    'generalBroadcast/fetchBroadcast',
    async function (_, {rejectWithValue, getState}) {


        const state = getState();
        const urls = state.generalBroadcast.citiesGeopositions.map(geoposition => fetch(`${API_BASE_URL}data/2.5/weather?lat=${geoposition.lat}&lon=${geoposition.lon}&units=metric&appid=ba63aad5cef0cee38d4091641a095fbe`))

        try {
            const responses = await Promise.all(urls);
            const data = await Promise.all(responses.map(resp => resp.json()));
            return data
        } catch (error) {
            return rejectWithValue('Server Error!');
        }

    },
    {
        condition: (_, {getState}) => {
            const {generalBroadcast} = getState();
            if (generalBroadcast.status === 'loading') return false;
        }
    }
)


export const generalBroadcastSlice = createSlice({
    name: 'generalBroadcast',

    initialState: {
        broadcasts: [],
        broadcastStatus: null,
        broadcastError: null,
        citiesList: [],
        citiesGeopositions: [],
        citiesStatus: null,
        citiesError: null
    },

    reducers: {
        addCity: (state, action) => {
            console.log(action.payload)
            if (!action.payload.trim()) return false;
            else state.citiesList.push(action.payload);
        }
    },

    extraReducers: builder => {
        builder
            .addCase(fetchBroadcast.pending, (state) => {
                state.broadcastStatus = 'loading'
            })

            .addCase(fetchBroadcast.fulfilled, (state, action) => {
                state.broadcastStatus = 'resolved';
                state.broadcasts = action.payload;
            })

            .addCase(fetchBroadcast.rejected, (state, action) => {
                state.broadcastStatus = 'rejected';
                state.broadcastError = action.payload;
            })

            .addCase(fetchCitiesGeoposition.pending, (state) => {
                state.citiesStatus = 'loading'
            })

            .addCase(fetchCitiesGeoposition.fulfilled, (state, action) => {
                state.citiesStatus = 'resolved';

                console.log(action.payload)

                action.payload.forEach((item) => {
                    let geoData = {};
                    geoData.lon = item.lon;
                    geoData.lat = item.lat;
                    geoData.name = item.name;
                    geoData.state = item.state;
                    geoData.country = item.country;
                    state.citiesGeopositions.push(geoData);
                })
            })

            .addCase(fetchCitiesGeoposition.rejected, (state, action) => {
                state.citiesStatus = 'rejected';
                state.citiesError = action.payload;
            })
    }
});


export const {addCity} = generalBroadcastSlice.actions;
export default generalBroadcastSlice.reducer;
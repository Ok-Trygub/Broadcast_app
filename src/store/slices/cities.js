import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../utils/API_CONFIG';

export const fetchCitiesGeoposition = createAsyncThunk(
    'cities/fetchCitiesGeoposition',
    async function (currentCity, {rejectWithValue, dispatch}) {

        dispatch(addCity(currentCity));

        try {
            const response = await fetch(`${API_BASE_URL}geo/1.0/direct?q=${currentCity}&limit=5&appid=ba63aad5cef0cee38d4091641a095fbe`);
            const data = await response.json();
            return data
        } catch (error) {
            return rejectWithValue('Server Error!');
        }
    },
    {
        condition: (_, {getState}) => {
            const {cities} = getState();
            if (cities.status === 'loading') return false;
        }
    }
)


export const citiesSlice = createSlice({
    name: 'cities',

    initialState: {
        citiesList: [],
        citiesGeopositions: [],
        citiesStatus: null,
        citiesError: null
    },

    reducers: {
        addCity: (state, action) => {
            if (!action.payload.trim()) return false;
            else state.citiesList.push(action.payload);
        }
    },


    extraReducers: builder => {
        builder
            .addCase(fetchCitiesGeoposition.pending, (state) => {
                state.citiesStatus = 'loading'
            })

            .addCase(fetchCitiesGeoposition.fulfilled, (state, action) => {
                state.citiesStatus = 'resolved';

                action.payload.forEach((item) => {
                    console.log(action.payload)
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

const {addCity} = citiesSlice.actions;
export default citiesSlice.reducer;
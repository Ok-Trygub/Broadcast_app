import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL, API_KEY} from '../../utils/API_CONFIG';
import {setCitiesGeoposition} from '../../functions/Storage';

export const fetchCitiesGeoposition = createAsyncThunk(
    'cities/fetchCitiesGeoposition',
    async function (currentCity, {rejectWithValue, dispatch}) {

        dispatch(addCity(currentCity));

        try {
            const response = await fetch(`${API_BASE_URL}geo/1.0/direct?q=${currentCity}&limit=5&appid=${API_KEY}`);
            if (!response.ok) return rejectWithValue(response.ok);
            else {
                const data = await response.json();
                return data
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
    {
        condition: (_, {getState}) => {
            const {cities} = getState();
            if (cities.citiesStatus === 'loading') return false;
        }
    }
)


export const citiesSlice = createSlice({
    name: 'cities',

    initialState: {
        citiesList: [],
        citiesGeopositions: [],
        citiesStatus: null
    },

    reducers: {
        addCity: (state, action) => {
            if (!action.payload.trim()) return false;
            else state.citiesList.push(action.payload);
        },

        addCitiesGeopositions: (state, action) => {
            if (state.citiesGeopositions.length > 0) return;
            state.citiesGeopositions = action.payload;
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
                    let geoData = {};
                    geoData.lon = item.lon;
                    geoData.lat = item.lat;
                    geoData.name = item.name;
                    geoData.state = item.state;
                    geoData.country = item.country;
                    state.citiesGeopositions.push(geoData);
                    setCitiesGeoposition(geoData);
                })
            })

            .addCase(fetchCitiesGeoposition.rejected, (state) => {
                state.citiesStatus = 'rejected';
            })
    }
});

export const {addCity, addCitiesGeopositions} = citiesSlice.actions;
export default citiesSlice.reducer;
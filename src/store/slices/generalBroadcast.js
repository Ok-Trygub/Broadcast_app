import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL, API_KEY} from '../../utils/API_CONFIG';


export const fetchBroadcast = createAsyncThunk(
    'broadcasts/fetchBroadcast',
    async function (citiesGeopositions, {rejectWithValue}) {

        const urls = citiesGeopositions.map(geoposition => fetch(`${API_BASE_URL}data/2.5/weather?lat=${geoposition.lat}&lon=${geoposition.lon}&units=metric&appid=${API_KEY}`))

        try {
            const responses = await Promise.all(urls);
            const data = await Promise.all(responses.map(resp => resp.json()));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
    {
        condition: (_, {getState}) => {
            const {broadcasts} = getState();
            if (broadcasts.broadcastsStatus === 'loading') return false;
        }
    }
)


export const fetchCurrentBroadcast = createAsyncThunk(
    'broadcasts/fetchCurrentBroadcast',
    async function (geoposition, {rejectWithValue, getState}) {

        const existingBroadcastsArr = getState().broadcasts.broadcasts;

        try {
            const response = await fetch(`${API_BASE_URL}data/2.5/weather?lat=${geoposition.lat}&lon=${geoposition.lon}&units=metric&appid=${API_KEY}`);
            if (!response.ok) return rejectWithValue(response.ok);
            else {
                const data = await response.json();

                return existingBroadcastsArr.map(broadcast => {

                    if (broadcast.id === data.id) {
                        broadcast = data;
                        broadcast.test = 'test!!!!!!!!!!!!'
                    }
                    return broadcast;
                });
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const generalBroadcastSlice = createSlice({
    name: 'broadcasts',

    initialState: {
        broadcasts: [],
        broadcastsStatus: null,
        currentBroadcastStatus: null,
    },

    extraReducers: builder => {
        builder
            .addCase(fetchBroadcast.pending, (state) => {
                state.broadcastsStatus = 'loading';
            })

            .addCase(fetchBroadcast.fulfilled, (state, action) => {
                state.broadcastsStatus = 'resolved';
                state.broadcasts = action.payload;
            })

            .addCase(fetchBroadcast.rejected, (state) => {
                state.broadcastsStatus = 'rejected';
            })

            .addCase(fetchCurrentBroadcast.pending, (state) => {
                state.currentBroadcastStatus = 'loading';
            })

            .addCase(fetchCurrentBroadcast.fulfilled, (state, {payload}) => {
                state.currentBroadcastStatus = 'resolved';
                state.broadcasts = payload;
            })

            .addCase(fetchCurrentBroadcast.rejected, (state) => {
                state.currentBroadcastStatus = 'rejected';
            })
    }
});

export default generalBroadcastSlice.reducer;
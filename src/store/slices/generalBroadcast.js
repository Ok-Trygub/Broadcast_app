import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../utils/API_CONFIG';


export const fetchBroadcast = createAsyncThunk(
    'broadcasts/fetchBroadcast',
    async function (citiesGeopositions, {rejectWithValue, getState}) {

        const urls = citiesGeopositions.map(geoposition => fetch(`${API_BASE_URL}data/2.5/weather?lat=${geoposition.lat}&lon=${geoposition.lon}&units=metric&appid=ba63aad5cef0cee38d4091641a095fbe`))

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
            const {broadcasts} = getState();
            if (broadcasts.status === 'loading') return false;
        }
    }
)


// export const fetchCurrentBroadcast = createAsyncThunk(
//     'broadcasts/fetchCurrentBroadcast',
//     async function (_, {rejectWithValue}) {
//
//
//         try {
//             const data = 'aaa'
//             console.log(data)
//             return data
//         } catch (error) {
//             return rejectWithValue('Server Error!');
//         }
//     },
    // {
    //     condition: (_, {getState}) => {
    //         const {generalBroadcast} = getState();
    //         if (generalBroadcast.status === 'loading') return false;
    //     }
    // }
// )




export const generalBroadcastSlice = createSlice({
    name: 'broadcasts',

    initialState: {
        broadcasts: [],
        broadcastStatus: null,
        broadcastError: null,
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
    }
});

export default generalBroadcastSlice.reducer;
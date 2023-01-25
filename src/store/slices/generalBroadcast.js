import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../utils/API_CONFIG';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {

        try {
            const response = await fetch(`${API_BASE_URL}data/2.5/weather?lat=33.44&lon=-94.04&appid=ba63aad5cef0cee38d4091641a095fbe`);
            const data = await response.json();
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
        todos: [],
        status: null,
        error: null
    },


    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.todos = action.payload;
            })

            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }

});

// export const {
//     addContact,
//
// } = contactsSlice.actions;
export default generalBroadcastSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            return data
        } catch (error) {
            return rejectWithValue('Server Error!');
        }
    },
    {
        condition: (_, {getState}) => {
            const {contacts} = getState();
            if (contacts.status === 'loading') return false;
        }
    }
)


export const contactsSlice = createSlice({
    name: 'contacts',

    initialState: {
        todos: [],
        status: null,
        error: null
    },


    // reducers: {
    //     addContact: (state, action) => {
    //         state.push(action.payload);
    //     },
    // },

    extraReducers: builder => {
        // console.log(builder)
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
export default contactsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiBooksListUrl } from '../../constants/urls.js';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiBooksListUrl);

            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
    // {
    //     condition: ({ getState }) => {
    //         const { booksList } = getState();
    //         // const fetchStatus = data.requests;
    //         if (booksList) {
    //             return false
    //         }

    //         return true;
    //     },
    // }
)

const bookListSlice = createSlice({
    name: 'books',
    initialState: {
        booksList: [],
        status: null,
        error: null
    },
    reducers: {
        getBooks(state, action) {
            state.booksList.push(action.payload)
        }
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchBooks.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.booksList = action.payload
        },
        [fetchBooks.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const { getBooks } = bookListSlice.actions;
export const bookListReducer = bookListSlice.reducer;
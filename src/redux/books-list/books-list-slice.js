import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiBooksListUrl } from '../../constants/urls.js';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const books = await axios.get(apiBooksListUrl).then(book => book);

        return books;
    }
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
            state.books.push(action.payload)
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
        [fetchBooks.rejected]: (state) => { },
    }
});

export const { getBooks } = bookListSlice.actions;
export const bookListReducer = bookListSlice.reducer;
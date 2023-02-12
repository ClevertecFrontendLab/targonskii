import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiBooksListUrl } from '../../constants/urls.js';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const books = await fetch(apiBooksListUrl)
            .then(responce => responce.json())
            .then(data => data);

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
            state.booksList.push(action.payload)
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .fetchBooks(pending, (state) => {

    //         })
    // }
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
            state.error = action.error.message
        }
    }
});

export const { getBooks } = bookListSlice.actions;
export const bookListReducer = bookListSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiBookUrl } from '../../constants/urls.js';

export const fetchBook = createAsyncThunk(
    'book/fetchBook',
    async (id) => {
        const book = await fetch(apiBookUrl + id)
            .then(responce => responce.json())
            .then(data => data);

        return book;
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        book: [],
        status: null,
        error: null
    },
    reducers: {
        getBook(state, action) {
            state.book.push(action.payload)
        }
    },
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.book = action.payload
        },
        [fetchBook.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const { getBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
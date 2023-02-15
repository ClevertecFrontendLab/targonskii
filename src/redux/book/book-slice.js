import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiBookUrl } from '../../constants/urls.js';

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(apiBookUrl + id);

            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        book: null,
        status: null,
        error: null
    },
    reducers: {
        getBook(state, action) {
            // state.book.push(action.payload)
            state.book = [...state.book, action.payload]
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
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiCategoriesUrl } from '../../constants/urls.js';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(apiCategoriesUrl);

            if (!response.ok) {
                throw new Error('Server Error');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: null,
        error: null
    },
    reducers: {
        getCategories(state, action) {
            state.categories.push(action.payload)
        }
    },
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.categories = action.payload
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const { getCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
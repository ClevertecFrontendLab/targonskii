import { combineReducers } from '@reduxjs/toolkit';

import { bookListReducer } from './books-list/books-list-slice.js';

export const rootReducer = combineReducers({
    bookList: bookListReducer
})
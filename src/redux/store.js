// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer.js';
// import { bookListReducer } from './books-list/books-list-slice.js'


export const store = configureStore({
    reducer: rootReducer
    // middleware: thunk
});
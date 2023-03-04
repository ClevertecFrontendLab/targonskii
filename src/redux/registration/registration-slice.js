import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        'registration': {
            'username': null,
            'password': null,
            'firstName': null,
            'lastName': null,
            'email': null,
            'phone': null
        }
    },
    reducers: {
        setRegistration(state, action) {
            state.user.username = action.payload.user.username;
            state.user.password = action.payload.user.password;
            state.user.firstName = action.payload.user.firstName;
            state.user.lastName = action.payload.user.lastName; 
            state.user.email = action.payload.user.email;
            state.user.phone = action.payload.user.phone;
        },
        removeRegistration(state) {
            state.user.username = null;
            state.user.password = null;
            state.user.firstName = null;
            state.user.lastName = null; 
            state.user.email = null;
            state.user.phone = null;
        }
    }
});

export const { setRegistration, removeRegistration } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
import { createSlice, configureStore } from '@reduxjs/toolkit'

const user = createSlice({
    name: '@codeleap',
    initialState: {
        username: '',
    },
    reducers: {
        defineUsername: (state, action) => {
            state.username = action.payload
        },
    }
})

export const { defineUsername } = user.actions;

export default user.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const url = 'https://randomuser.me/api/?results=5';
export const getUser = createAsyncThunk('user/getUser',
    async (thunkAPI) => {
        try {
            const resp = await axios(url);
            return resp.data.results;
        } catch (err) {
            // console.log(err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

const initialState = {
    users: [],
    isLoading: false,
    error: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                console.log(payload)
                state.isLoading = false;
                state.users = payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.name;
            })
    }
});

export default userSlice.reducer; 

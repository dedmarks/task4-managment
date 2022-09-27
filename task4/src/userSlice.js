import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser: null,
    isFetching: false,
    error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart:(state) => {
      state.isFetching = true
    },
    logout:(state, action) => {
      state.currentUser = null;
    },
    loginSucces:(state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      if(action.payload.status === 'blocked'){
        state.currentUser = null
      }
    },
    loginFailure:(state) => {
      state.isFetching = false
      state.error = true
    },
  },
});

export const { loginStart, loginSucces, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
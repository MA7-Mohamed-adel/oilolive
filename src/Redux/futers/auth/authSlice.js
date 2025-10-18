import { createSlice } from "@reduxjs/toolkit";
import { apiServices } from "../../services/Apisl/SpiltApi";

const initialState = {
    isAuth:false,
    role:null
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       onAuthSuccess: (state) => {
        state.isAuth = true;
      },
      onAuthFail: (state) => {
        state.isAuth = false;
        state.role = null;
      }
    },
    extraReducers:(builder) => {
        builder.addMatcher(apiServices.endpoints.getAuthUser.matchFulfilled , (state,action)=> {
           state.role = action.payload.role
        })
    }
})
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectRole = (state) => state.auth.role;
export const {onAuthFail,onAuthSuccess} = authSlice.actions;
export default authSlice.reducer;
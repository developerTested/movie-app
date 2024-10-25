import { createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "@/redux/store";
import { User } from "@/types";

export type AuthState = {
    loading: boolean,
    loggedIn: boolean,
    error: string | null,
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
}

const initialState: AuthState = {
    loading: false,
    error: null,
    loggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        
        login: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload;
        }
    }
});

export const { setAccessToken, login, logout } = authReducer.actions;
export const selectToken = (state: AppRootState) => state.auth.accessToken;
export const getRefreshToken = (state: AppRootState) => state.auth.refreshToken;

export default authReducer.reducer
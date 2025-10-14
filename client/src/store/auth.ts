import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type AuthResponse from "../models/AuthResponse";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../constants";
// import type SignInData from "../models/SignInData";
// import authService from "../service/AuthService";
// import { LOCAL_STORAGE_ACCESS_TOKEN } from "../constants";
// import axios from "axios";
// import type ApiErrorResponse from "../models/ApiErrorResponse";
// import type SignUpData from "../models/SignUpData";

export interface AuthState {
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authenticate(state, action: PayloadAction<AuthResponse>) {
			const token = action.payload.accessToken;
			localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

// const login = createAsyncThunk(
// 	"auth/login",
// 	async (data: SignInData, { dispatch }) => {
// 		try {
// 			dispatch(actions.setAuthState("loading"));
// 			const authResponse = await authService.login(data);
// 			localStorage.setItem(
// 				LOCAL_STORAGE_ACCESS_TOKEN,
// 				authResponse.accessToken
// 			);
// 			dispatch(actions.setAuthState("authorized"));
// 			dispatch(actions.resetErrors());
// 		} catch (err) {
// 			if (axios.isAxiosError<ApiErrorResponse>(err)) {
// 				const authError = err.response?.data;

// 				if (authError) dispatch(actions.setSignInError(authError));
// 			}
// 			dispatch(actions.setAuthState("unauthorized"));
// 		}
// 	}
// );

// const register = createAsyncThunk(
// 	"auth/register",
// 	async (data: SignUpData, { dispatch }) => {
// 		try {
// 			dispatch(actions.setAuthState("loading"));
// 			const authResponse = await authService.register(data);
// 			localStorage.setItem(
// 				LOCAL_STORAGE_ACCESS_TOKEN,
// 				authResponse.accessToken
// 			);
// 			dispatch(actions.setAuthState("authorized"));
// 			dispatch(actions.resetErrors());
// 		} catch (err) {
// 			if (axios.isAxiosError<ApiErrorResponse>(err)) {
// 				const authError = err.response?.data;

// 				if (authError) dispatch(actions.setSignUpError(authError));
// 			}
// 			dispatch(actions.setAuthState("unauthorized"));
// 		}
// 	}
// );

export default authSlice.reducer;

export const actions = { ...authSlice.actions };

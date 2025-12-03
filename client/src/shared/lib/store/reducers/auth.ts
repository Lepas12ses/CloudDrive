import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	token: string | null;
}

const initialState: AuthState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload;
		},
	},
});

export default authSlice.reducer;

export const authActions = { ...authSlice.actions };

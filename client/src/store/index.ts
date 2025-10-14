import { configureStore } from "@reduxjs/toolkit";
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from "react-redux";

import authReducer from "./auth";

const store = configureStore({ reducer: { auth: authReducer } });

export default store;

type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

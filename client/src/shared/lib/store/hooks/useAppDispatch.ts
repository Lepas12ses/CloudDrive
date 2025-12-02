import { useDispatch } from "react-redux";
import type { AppDispatch } from "../types";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;

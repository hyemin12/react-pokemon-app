import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import store, { RootState } from "@/store";

type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

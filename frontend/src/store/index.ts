import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./coinSlice";

const store = configureStore({
  reducer: {
    coins: coinReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

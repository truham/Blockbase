import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./coinSlice";
import nftReducer from "./nftSlice";

const store = configureStore({
  reducer: {
    coins: coinReducer,
    nfts: nftReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

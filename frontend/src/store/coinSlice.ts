import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coin } from "../types";
import { getCoins, getCoin, getCoinHistory } from "../services/coinService";

interface CoinState {
  coins: Coin[];
  coinDetails: Record<string, Coin | null>;
  coinHistory: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: CoinState = {
  coins: [],
  coinDetails: {},
  coinHistory: {},
  loading: false,
  error: null,
};

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await getCoins();
  return response;
});

export const fetchCoinDetails = createAsyncThunk(
  "coins/fetchCoinDetails",
  async (id: string) => {
    const response = await getCoin(id);
    return { id, data: response };
  }
);

export const fetchCoinHistory = createAsyncThunk(
  "coins/fetchCoinHistory",
  async (id: string) => {
    const response = await getCoinHistory(id);
    return { id, data: response };
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coins";
      })
      .addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.coinDetails[action.payload.id] = action.payload.data;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coin details";
      })
      .addCase(fetchCoinHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.coinHistory[action.payload.id] = action.payload.data;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coin history";
      });
  },
});

export default coinSlice.reducer;

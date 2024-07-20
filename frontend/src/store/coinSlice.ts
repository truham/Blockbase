import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin, CoinDetail, CoinHistory } from "../types";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios.get<Coin[]>("http://localhost:5000/api/coins");
  return response.data;
});

interface FetchAllCoinsArgs {
  page: number;
  perPage: number;
}

export const fetchAllCoins = createAsyncThunk(
  "coins/fetchAllCoins",
  async ({ page, perPage }: FetchAllCoinsArgs) => {
    const response = await axios.get<Coin[]>(
      `http://localhost:5000/api/coins?page=${page}&per_page=${perPage}`
    );
    return response.data;
  }
);

export const fetchCoinDetails = createAsyncThunk(
  "coins/fetchCoinDetails",
  async (id: string) => {
    const response = await axios.get<CoinDetail>(
      `http://localhost:5000/api/coins/${id}`
    );
    return { id, data: response.data };
  }
);

export const fetchCoinHistory = createAsyncThunk(
  "coins/fetchCoinHistory",
  async (id: string) => {
    const response = await axios.get<CoinHistory>(
      `http://localhost:5000/api/coins/${id}/history`
    );
    return { id, data: response.data };
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [] as Coin[],
    allCoins: [] as Coin[],
    coinDetails: {} as Record<string, CoinDetail>,
    coinHistory: {} as Record<string, CoinHistory>,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchAllCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoins.fulfilled, (state, action) => {
        state.allCoins = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.coinDetails[action.payload.id] = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchCoinHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.coinHistory[action.payload.id] = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default coinSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeState {
  time: number | null;
}

const initialState: TimeState = {
  time: null,
};

const loadingAuctionTimeSlice = createSlice({
  name: "loadingTime",
  initialState,
  reducers: {
    setLoadingAuctionTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },

    clearLoadingAuctionTime: (state) => {
      state.time = null;
    },
  },
});

export const { setLoadingAuctionTime, clearLoadingAuctionTime } =
  loadingAuctionTimeSlice.actions;
export const loadingAuctionTimeReducer = loadingAuctionTimeSlice.reducer;

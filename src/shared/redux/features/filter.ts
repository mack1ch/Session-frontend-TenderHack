import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchFilterState {
  regions?: string[];
}

const initialState: SearchFilterState = {
  regions: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchFilterRegions: (state, action: PayloadAction<string[]>) => {
      state.regions = action.payload;
    },
  },
});

export const { setSearchFilterRegions } = filterSlice.actions;
export const searchFilterRegionReducer = filterSlice.reducer;

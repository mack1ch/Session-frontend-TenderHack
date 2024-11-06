import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchFilterState {
  regions?: string[];
  initialDuration: string;
  hasParticipants: string;
  isContractGuaranteeRequired: string;
  isElectronicContractExecutionRequired: string;
}

const initialState: SearchFilterState = {
  regions: [],
  initialDuration: "",
  hasParticipants: "",
  isContractGuaranteeRequired: "",
  isElectronicContractExecutionRequired: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchFilterRegions: (state, action: PayloadAction<string[]>) => {
      state.regions = action.payload;
    },
    setSearchFilterInitialDuration: (state, action: PayloadAction<string>) => {
      state.initialDuration = action.payload;
    },
    setSearchFilterHasParticipants: (state, action: PayloadAction<string>) => {
      state.hasParticipants = action.payload;
    },
    setSearchFilterContractGuaranteeRequired: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isContractGuaranteeRequired = action.payload;
    },
    setSearchFilterElectronicContractExecutionRequired: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isElectronicContractExecutionRequired = action.payload;
    },
  },
});

export const {
  setSearchFilterRegions,
  setSearchFilterInitialDuration,
  setSearchFilterHasParticipants,
  setSearchFilterContractGuaranteeRequired,
  setSearchFilterElectronicContractExecutionRequired,
} = filterSlice.actions;
export const searchFilterRegionReducer = filterSlice.reducer;

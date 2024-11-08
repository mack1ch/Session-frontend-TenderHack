import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchFilterState {
  regions?: string[];
  initialDuration: string;
  hasParticipants: string;
  isContractGuaranteeRequired: string;
  isElectronicContractExecutionRequired: string;
  product: string;
}

const initialState: SearchFilterState = {
  regions: [],
  initialDuration: "",
  hasParticipants: "",
  isContractGuaranteeRequired: "",
  isElectronicContractExecutionRequired: "",
  product: "",
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
    setSearchFilterProduct: (state, action: PayloadAction<string>) => {
      state.product = action.payload;
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
  setSearchFilterProduct,
  setSearchFilterContractGuaranteeRequired,
  setSearchFilterElectronicContractExecutionRequired,
} = filterSlice.actions;
export const searchFilterRegionReducer = filterSlice.reducer;

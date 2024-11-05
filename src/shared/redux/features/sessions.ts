import { IAuction } from "@/shared/interface/auction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessions: IAuction[];
}

const initialState: SessionState = {
  sessions: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionsArray: (state, action: PayloadAction<IAuction[]>) => {
      state.sessions = action.payload;
    },
    clearSessionsArray: (state) => {
      state.sessions = [];
    },
  },
});

export const { setSessionsArray, clearSessionsArray } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

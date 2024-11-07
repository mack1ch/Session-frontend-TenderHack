import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./features/search";
import { sessionReducer } from "./features/sessions";
import { searchFilterRegionReducer } from "./features/filter";
import { loadingAuctionTimeReducer } from "./features/loadingAuctionTime";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      session: sessionReducer,
      filter: searchFilterRegionReducer,
      loadingTime: loadingAuctionTimeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

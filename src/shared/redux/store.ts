import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./features/search";
import { sessionReducer } from "./features/sessions";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      session: sessionReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

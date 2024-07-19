import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@/redux/slices/alertSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      alert: alertReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

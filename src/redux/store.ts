import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "@/redux/slices/alertSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      alert: alertSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

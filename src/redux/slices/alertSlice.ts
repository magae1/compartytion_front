import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = {
  message: string;
  severity: "success" | "warning" | "info" | "error";
};

interface AlertState {
  value: {
    severity: "success" | "warning" | "info" | "error";
    message: string;
    open: boolean;
  };
}

const initValue: AlertState = {
  value: {
    severity: "info",
    message: "",
    open: false,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initValue,
  reducers: {
    closeAlert: (state) => {
      state.value.open = false;
    },
    openAlert: (state, action: PayloadAction<AlertType>) => {
      const { message, severity } = action.payload;
      state.value.open = true;
      state.value.message = message;
      state.value.severity = severity;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;

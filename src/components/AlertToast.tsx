"use client";
import { SyntheticEvent } from "react";
import { Snackbar, Alert } from "@mui/material";

import { useAppSelector } from "@/redux/hooks";
import { closeAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function AlertToast() {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert.value);

  const onClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={alert.severity}
        variant={"filled"}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

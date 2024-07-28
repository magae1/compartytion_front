"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@mui/material";

const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { pending } = useFormStatus();
    return (
      <Button
        type={"submit"}
        variant={"contained"}
        disableElevation
        disabled={pending}
        ref={ref}
        {...props}
      />
    );
  },
);

export default SubmitButton;

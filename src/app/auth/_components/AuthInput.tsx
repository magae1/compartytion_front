import { ReactNode } from "react";
import { InputLabel, OutlinedInput, OutlinedInputProps } from "@mui/material";

interface Props extends OutlinedInputProps {
  label_str: string;
  children: ReactNode;
}

export default function AuthInput(props: Props) {
  const { label_str, children } = props;
  return (
    <>
      <InputLabel shrink disableAnimation margin={"dense"}>
        {label_str}
      </InputLabel>
      <OutlinedInput
        label={undefined}
        inputProps={{
          style: { padding: "10px 7px" },
        }}
        sx={{ marginTop: "11px" }}
        {...props}
      />
      {children}
    </>
  );
}

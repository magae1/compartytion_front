import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { FieldError } from "react-hook-form";
import { forwardRef, ReactNode, Ref } from "react";

interface Props extends OutlinedInputProps {
  label: string;
  field_error?: FieldError;
  button?: ReactNode;
  helper_node?: ReactNode;
}

const AuthInput = forwardRef<Ref<HTMLInputElement>, Props>((props, ref) => {
  const { label, field_error, button, helper_node } = props;
  return (
    <FormControl error={!!field_error}>
      <InputLabel shrink={true} disableAnimation={true} margin={"dense"}>
        {label}
      </InputLabel>
      <div style={{ display: "flex", flexGrow: 1 }}>
        <OutlinedInput
          {...props}
          ref={ref}
          inputProps={{
            style: { padding: "10px 7px" },
          }}
          fullWidth
          label={undefined}
          sx={{ marginTop: "11px" }}
        />
        <div>{button}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          <FormHelperText>{field_error?.message}</FormHelperText>
        </div>
        <div>{helper_node}</div>
      </div>
    </FormControl>
  );
});

export default AuthInput;

import { Button, ButtonProps } from "@mui/material";

export default function SubmitButton(props: ButtonProps) {
  return (
    <Button type={"submit"} variant={"contained"} disableElevation {...props} />
  );
}

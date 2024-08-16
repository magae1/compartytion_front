"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import { useAppDispatch } from "@/redux/hooks";
import { changeUsername } from "@/app/actions";
import { openAlert } from "@/redux/slices/alertSlice";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";

const initialState: {
  username: string[];
  success?: boolean;
  detail?: string;
} = {
  username: ["사이트 내에서 각 계정이 가지는 고유한 별명입니다."],
};

export default function UsernameForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, formAction] = useFormState(changeUsername, initialState);

  useEffect(() => {
    if (state.success) {
      dispatch(openAlert({ message: state.detail, severity: "success" }));
      router.back();
    } else if (state.detail) {
      dispatch(openAlert({ message: state.detail, severity: "error" }));
    }
  }, [state]);

  return (
    <Stack component={"form"} spacing={2} action={formAction}>
      <FormControl
        error={
          !!state.username && initialState.username[0] != state.username[0]
        }
      >
        <FormInput
          label_str={"사용자명"}
          name={"username"}
          autoComplete={"off"}
          fullWidth
        >
          {state.username?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <SubmitButton>변경</SubmitButton>
    </Stack>
  );
}

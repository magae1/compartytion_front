"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";

import FormInput from "@/components/FormInput";
import { changePassword } from "@/app/actions";
import { useAppDispatch } from "@/redux/hooks";
import { openAlert } from "@/redux/slices/alertSlice";
import SubmitButton from "@/components/SubmitButton";

const initialState: {
  detail?: string;
  password?: string[];
  new_password?: string[];
  new_password_confirmation?: string[];
  success?: boolean;
  message?: string;
} = {};

export default function ChangePasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, formAction] = useFormState(changePassword, initialState);

  useEffect(() => {
    if (state.detail) {
      dispatch(openAlert({ message: state.detail, severity: "error" }));
    }
    if (state.success) {
      dispatch(
        openAlert({ message: "비밀번호가 변경됐습니다.", severity: "success" }),
      );
      router.back();
    }
  }, [state]);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction} width={"100%"}>
      <FormControl error={!!state.password}>
        <FormInput
          label_str={"현재 비밀번호"}
          name={"password"}
          type={"password"}
          autoComplete={"off"}
        >
          {state.password?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <FormControl error={!!state.new_password}>
        <FormInput
          label_str={"새 비밀번호"}
          name={"new_password"}
          type={"password"}
          autoComplete={"new-password"}
        >
          {state.new_password?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <FormControl error={!!state.new_password_confirmation}>
        <FormInput
          label_str={"새 비밀번호(확인)"}
          name={"new_password_confirmation"}
          type={"password"}
          autoComplete={"new-password"}
        >
          {state.new_password_confirmation?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <Box>
        <SubmitButton>변경</SubmitButton>
      </Box>
    </Stack>
  );
}

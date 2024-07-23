"use client";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import SubmitButton from "@/app/auth/_components/SubmitButton";
import { checkEmail } from "@/app/actions";
import AuthInput from "@/app/auth/_components/AuthInput";

const initialState: { email?: string[] } = {};

export default function EmailForm() {
  const [state, formAction] = useFormState(checkEmail, initialState);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction}>
      <FormControl error={!!state.email}>
        <AuthInput
          label_str={"이메일"}
          name={"email"}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        >
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </AuthInput>
      </FormControl>
      <SubmitButton>이메일로 계속</SubmitButton>
    </Stack>
  );
}

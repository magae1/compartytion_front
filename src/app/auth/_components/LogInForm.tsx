"use client";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import SubmitButton from "@/app/auth/_components/SubmitButton";
import { logIn } from "@/app/actions";
import AuthInput from "@/app/auth/_components/AuthInput";

const initialState: { email?: string[]; password?: string[] } = {};

interface Props {
  email?: string;
}

export default function LogInForm(props: Props) {
  const [state, formAction] = useFormState(logIn, initialState);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction}>
      <FormControl error={!!state.email}>
        <AuthInput
          label_str={"이메일"}
          name={"email"}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
          defaultValue={props.email}
        >
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </AuthInput>
      </FormControl>
      <FormControl error={!!state.password}>
        <AuthInput
          label_str={"비밀번호"}
          type={"password"}
          name={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          autoComplete={"current-password"}
        >
          {state?.password?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </AuthInput>
      </FormControl>
      <SubmitButton>기존 이메일로 로그인</SubmitButton>
    </Stack>
  );
}

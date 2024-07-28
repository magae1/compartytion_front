"use client";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import SubmitButton from "@/components/SubmitButton";
import FormInput from "@/components/FormInput";

const initialState: { email?: string[]; password?: string[] } = {};

interface Props {
  email?: string;
  action: any;
}

export default function LogInForm({ email, action }: Props) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction}>
      <FormControl error={!!state.email}>
        <FormInput
          label_str={"이메일"}
          name={"email"}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
          defaultValue={email}
        >
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <FormControl error={!!state.password}>
        <FormInput
          label_str={"비밀번호"}
          type={"password"}
          name={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          autoComplete={"current-password"}
        >
          {state?.password?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <SubmitButton>기존 이메일로 로그인</SubmitButton>
    </Stack>
  );
}

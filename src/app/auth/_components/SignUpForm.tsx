"use client";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import SubmitButton from "@/components/SubmitButton";
import FormInput from "@/components/FormInput";

const initialState: {
  email?: string[];
  password?: string[];
  username: string[];
  confirm?: string[];
} = {
  username: ["사이트 내에서 각 계정이 가지는 고유한 별명입니다."],
};

interface Props {
  email?: string;
  action: any;
}

export default function SignUpForm({ email, action }: Props) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Stack spacing={2} component={"form"} action={formAction}>
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
      <FormControl
        error={
          !!state.username && initialState.username[0] != state.username[0]
        }
      >
        <FormInput
          label_str={"사용자명"}
          name={"username"}
          placeholder={"사용자명을 입력해주세요."}
          autoComplete={"off"}
        >
          {state?.username?.map((v: string) => (
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
          autoComplete={"new-password"}
        >
          {state?.password?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <FormControl error={!!state.confirm}>
        <FormInput
          label_str={"비밀번호(확인)"}
          type={"password"}
          name={"confirm"}
          placeholder={"비밀번호(확인)를 입력해주세요."}
          autoComplete={"new-password"}
        >
          {state?.confirm?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <SubmitButton>새 계정 만들기</SubmitButton>
    </Stack>
  );
}

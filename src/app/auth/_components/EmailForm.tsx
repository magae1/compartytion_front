"use client";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import SubmitButton from "@/components/SubmitButton";
import FormInput from "@/components/FormInput";

const initialState: { email?: string[] } = {};

export default function EmailForm({ action }: { action: any }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction}>
      <FormControl error={!!state.email}>
        <FormInput
          label_str={"이메일"}
          name={"email"}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        >
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <SubmitButton>이메일로 계속</SubmitButton>
    </Stack>
  );
}

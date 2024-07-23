"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import SubmitButton from "@/app/auth/_components/SubmitButton";
import { sendOTP, verifyOTP } from "@/app/actions";
import AuthInput from "@/app/auth/_components/AuthInput";

const initialState: { email?: string[]; otp: string[] } = {
  otp: ["이메일로 전송된 OTP를 입력해주세요."],
};

const initialSentState: { email?: string[]; remaining_time?: number } = {};

interface Props {
  email?: string;
}

export default function OTPForm(props: Props) {
  const mounted = useRef<boolean>(false);
  const timerRef = useRef<FanyTimerType | null>(null);
  const otpButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useFormState(verifyOTP, initialState);
  const [sentState, sendAction] = useFormState(sendOTP, initialSentState);

  useEffect(() => {
    if (mounted.current) {
      otpButtonRef.current && otpButtonRef.current.click();
    } else {
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (timerRef.current && sentState.remaining_time) {
      timerRef.current.reset(sentState.remaining_time);
    }
    if (timerRef.current && sentState.email) {
      timerRef.current.reset(0);
    }
  }, [sentState]);

  return (
    <Stack spacing={1.5} component={"form"} action={formAction}>
      <FormControl error={!!state?.email || !!sentState?.email}>
        <AuthInput
          label_str={"이메일"}
          name={"email"}
          defaultValue={props.email}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        >
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
          {sentState?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </AuthInput>
      </FormControl>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 64px", gap: 4 }}>
        <FormControl error={!!state.otp && initialState.otp[0] != state.otp[0]}>
          <AuthInput
            label_str={"OTP"}
            name={"otp"}
            placeholder={"OTP를 입력해주세요."}
            autoComplete={"one-time-code"}
          >
            {state?.otp?.map((v: string) => (
              <FormHelperText key={v}>{v}</FormHelperText>
            ))}
          </AuthInput>
        </FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <SubmitButton
            variant={"outlined"}
            type={"submit"}
            formAction={sendAction}
            ref={otpButtonRef}
            sx={{ height: "43px", marginTop: "11px", padding: "2px 4px" }}
          >
            재전송
          </SubmitButton>
          <FancyTimer variant={"caption"} ref={timerRef} />
        </div>
      </div>
      <SubmitButton>확인</SubmitButton>
    </Stack>
  );
}

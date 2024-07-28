"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import { changeEmail, sendOTP } from "@/app/actions";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { openAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch } from "@/redux/hooks";

const initialState: { email?: string[]; otp?: string[] } = {};
const initialSentState: { email?: string[]; remaining_time?: number } = {};

export default function EmailForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const timerRef = useRef<FanyTimerType | null>(null);
  const otpButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useFormState(changeEmail, initialState);
  const [sentState, sendAction] = useFormState(sendOTP, initialSentState);

  useEffect(() => {
    if (timerRef.current && sentState.remaining_time) {
      timerRef.current.reset(sentState.remaining_time);
    }
    if (timerRef.current && sentState.email) {
      timerRef.current.reset(0);
    }
  }, [sentState]);

  useEffect(() => {
    if (state.success) {
      dispatch(openAlert({ message: state.detail, severity: "success" }));
      router.back();
    } else if (state.detail) {
      dispatch(openAlert({ message: state.detail, severity: "error" }));
    }
  }, [state]);

  return (
    <Stack spacing={2} component={"form"} action={formAction}>
      <FormControl error={!!state?.email || !!sentState?.email}>
        <FormInput label_str={"이메일"} name={"email"} autoComplete={"email"}>
          {state?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
          {sentState?.email?.map((v: string) => (
            <FormHelperText key={v}>{v}</FormHelperText>
          ))}
        </FormInput>
      </FormControl>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 64px", gap: 4 }}>
        <FormControl error={!!state.otp}>
          <FormInput
            label_str={"OTP"}
            name={"otp"}
            autoComplete={"one-time-code"}
          >
            {state?.otp?.map((v: string) => (
              <FormHelperText key={v}>{v}</FormHelperText>
            ))}
          </FormInput>
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
            전송
          </SubmitButton>
          <FancyTimer variant={"caption"} ref={timerRef} />
        </div>
      </div>
      <SubmitButton>변경</SubmitButton>
    </Stack>
  );
}

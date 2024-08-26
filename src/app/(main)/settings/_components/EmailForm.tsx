"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import { changeEmail, sendOTP } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: { email?: string[]; otp?: string[] } = {};
const initialSentState: { email?: string[]; remaining_time?: number } = {};

export default function EmailForm() {
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
    } else if (state.detail) {
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          이메일
          <input name={"email"} className={"grow"} autoComplete={"email"} />
        </label>
        <div className={"label flex flex-col items-start"}>
          {state?.email?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
          {sentState?.email?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div className={"flex"}>
        <label className={"form-input-label flex-1"}>
          OTP
          <input
            name={"otp"}
            className={"grow"}
            autoComplete={"one-time-code"}
          />
        </label>
        <button
          type={"submit"}
          formAction={sendAction}
          ref={otpButtonRef}
          className={"btn flex-none ml-2"}
        >
          전송
        </button>
      </div>
      <div className={"flex"}>
        <div className={"label flex-1"}>
          {state?.otp?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
        <div className={"flex-none"}>
          <FancyTimer textsize={"text-sm"} ref={timerRef} />
        </div>
      </div>
      <SubmitButton>변경</SubmitButton>
    </form>
  );
}

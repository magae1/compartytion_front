"use client";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import { changeEmail, sendOTP } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "react-toastify";

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
      toast.success(state.detail ?? "");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>새 이메일</span>
        </div>
        <input
          name={"email"}
          className={"input input-bordered"}
          autoComplete={"off"}
        />
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
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>OTP</span>
        </div>
        <div className={"flex"}>
          <input
            name={"otp"}
            className={"flex-1 input input-bordered min-w-0"}
            autoComplete={"one-time-code"}
          />
          <button
            type={"submit"}
            formAction={sendAction}
            ref={otpButtonRef}
            className={"btn flex-none ml-2"}
          >
            전송
          </button>
        </div>
      </label>
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

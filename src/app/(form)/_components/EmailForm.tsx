"use client";
import { useEffect, useRef, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import { changeEmail, sendOTP } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: { email?: string[]; otp?: string[] } = {};
const initialSentState: { email?: string[]; remaining_time?: number } = {};

export default function EmailForm() {
  const router = useRouter();
  const timerRef = useRef<FanyTimerType | null>(null);
  const otpButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useActionState(changeEmail, {
    value: { email: "", otp: "" },
    message: initialState,
    isError: false,
  });
  const [sentState, sendAction] = useActionState(sendOTP, {
    value: { email: "" },
    message: initialSentState,
    isError: false,
  });

  useEffect(() => {
    if (timerRef.current && sentState.value.remaining_time) {
      timerRef.current.reset(sentState.value.remaining_time);
    }
    if (timerRef.current && sentState.message.email) {
      timerRef.current.reset(0);
    }
  }, [sentState]);

  useEffect(() => {
    if (!state.isError && state.message.detail) {
      toast.success(state.message.detail ?? "");
      router.back();
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
          defaultValue={sentState.value.email}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.email
            ? state.message.email?.map((v: string) => (
                <p key={v} className={"label-text-alt text-error"}>
                  {v}
                </p>
              ))
            : sentState.message.email?.map((v: string) => (
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
          {state.message.otp?.map((v: string) => (
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

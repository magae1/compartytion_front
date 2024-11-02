"use client";
import { useEffect, useRef, useActionState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import SubmitButton from "@/components/SubmitButton";
import { sendOTP } from "@/app/actions";
import { ActionResType } from "@/types";
import { OTPType } from "@/schemas";

const initialState: { email?: string[]; otp: string[] } = {
  otp: ["이메일로 전송된 OTP를 입력해주세요."],
};

const initialSentState: { email?: string[]; remaining_time?: number } = {};

interface Props {
  email?: string;
  verifyOTPAction: (
    prev: any,
    formData: FormData,
  ) => Promise<ActionResType<OTPType, any>>;
}

export default function OTPForm({ email, verifyOTPAction }: Props) {
  const mounted = useRef<boolean>(false);
  const timerRef = useRef<FanyTimerType | null>(null);
  const otpButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useActionState(verifyOTPAction, {
    value: { otp: "", email: email ?? "" },
    message: initialState,
    isError: false,
  });
  const [sentState, sendAction] = useActionState(sendOTP, {
    value: { email: email ?? "" },
    message: initialSentState,
    isError: false,
  });

  useEffect(() => {
    if (mounted.current) {
      otpButtonRef.current && otpButtonRef.current.click();
    } else {
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (timerRef.current && sentState.value.remaining_time) {
      timerRef.current.reset(sentState.value.remaining_time);
    }
    if (timerRef.current && sentState.message.email) {
      timerRef.current.reset(0);
    }
  }, [sentState]);

  return (
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          <IoMailOutline />
          <input
            name={"email"}
            className={"grow"}
            defaultValue={sentState.value.email}
            placeholder={"이메일 주소를 입력해주세요."}
            autoComplete={"username"}
          />
        </label>
        <div className={"label"}>
          {state.message.email
            ? state.message.email.map((v: string) => (
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
      </div>
      <div className={"flex"}>
        <label className={"form-input-label flex-1"}>
          <RiLockPasswordLine />
          <input
            name={"otp"}
            className={"grow"}
            placeholder={"OTP를 입력해주세요."}
            autoComplete={"one-time-code"}
          />
        </label>
        <button
          type={"submit"}
          formAction={sendAction}
          ref={otpButtonRef}
          className={"btn flex-none ml-2"}
        >
          재전송
        </button>
      </div>
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
      <SubmitButton>확인</SubmitButton>
    </form>
  );
}

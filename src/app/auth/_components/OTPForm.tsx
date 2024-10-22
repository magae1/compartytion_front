"use client";
import { useEffect, useRef, useActionState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";
import SubmitButton from "@/components/SubmitButton";
import { sendOTP } from "@/app/actions";

const initialState: { email?: string[]; otp: string[] } = {
  otp: ["이메일로 전송된 OTP를 입력해주세요."],
};

const initialSentState: { email?: string[]; remaining_time?: number } = {};

interface Props {
  email?: string;
  action: any;
}

export default function OTPForm({ email, action }: Props) {
  const mounted = useRef<boolean>(false);
  const timerRef = useRef<FanyTimerType | null>(null);
  const otpButtonRef = useRef<HTMLButtonElement>(null);
  const [state, formAction] = useActionState(action, initialState);
  const [sentState, sendAction] = useActionState(sendOTP, initialSentState);

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
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          <IoMailOutline />
          <input
            name={"email"}
            className={"grow"}
            defaultValue={email}
            placeholder={"이메일 주소를 입력해주세요."}
            autoComplete={"username"}
          />
        </label>
        <div className={"label"}>
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
      <SubmitButton>확인</SubmitButton>
    </form>
  );
}

"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  children: ReactNode;
}

export default function SubmitButton(props: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type={"submit"}
      disabled={pending}
      className={"btn btn-info w-full"}
    >
      {pending && <span className={"loading loading-spinner"}></span>}
      {props.children}
    </button>
  );
}

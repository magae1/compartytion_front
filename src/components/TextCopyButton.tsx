"use client";
import React, { useCallback, useRef, useState } from "react";
import _ from "underscore";
import { MdOutlineContentCopy, MdCheck } from "react-icons/md";

interface Props {
  text: string;
}

export default function TextCopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(
    _.throttle(() => {
      navigator.clipboard
        .writeText(text)
        .then((r) => {
          autoClose();
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.error(e.message);
          } else {
            console.error(e);
          }
        });
    }, 300),
    [],
  );

  const autoClose = () => {
    setCopied(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button className={"relative btn btn-square btn-sm"} onClick={handleCopy}>
      {copied ? (
        <MdCheck className={"text-green-500 animate-bounce"} />
      ) : (
        <MdOutlineContentCopy />
      )}
    </button>
  );
}

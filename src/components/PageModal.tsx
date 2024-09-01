"use client";
import { ElementRef, ReactNode, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function PageModal({ children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, []);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <dialog
      className={"modal modal-top sm:modal-middle"}
      ref={dialogRef}
      onClose={onDismiss}
    >
      <div className={"modal-box"}>
        <div className={"grow flex justify-end"}>
          <button
            className={"btn sm:btn-sm btn-circle btn-ghost"}
            onClick={onDismiss}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}

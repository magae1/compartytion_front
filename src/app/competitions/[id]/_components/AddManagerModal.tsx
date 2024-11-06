"use client";
import { useRef, useState } from "react";

import { ProfileType } from "@/types";
import ManagerInvitationList from "@/components/ManagerInvitationList";

export default function AddManagerModal() {
  const [managers, setManagers] = useState<ProfileType[]>([]);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        className={"btn btn-neutral no-animation"}
        onClick={() => modalRef.current?.showModal()}
      >
        대회 관리자 초대하기
      </button>
      <dialog ref={modalRef} className={"modal"}>
        <div className={"modal-box max-w-md"}>
          <h4 className={"font-bold text-lg mb-3"}>관리자 초대</h4>
          <ManagerInvitationList
            managers={managers}
            setManagers={setManagers}
          />
          <div className={"modal-action"}>
            <form onSubmit={(e) => e.preventDefault()}>
              <button className={"btn btn-primary"}>초대</button>
            </form>
            <form method={"dialog"}>
              <button className={"btn"}>닫기</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

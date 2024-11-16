"use client";
import { useActionState, useEffect, useRef, useState } from "react";

import { ProfileType } from "@/types";
import ManagerInvitationList from "@/components/ManagerInvitationList";
import { inviteManagers } from "@/app/actions";

const initialState: {
  usernames: string[];
} = { usernames: [] };

interface Props {
  competition_id: string;
}

export default function AddManagerModal(props: Props) {
  const { competition_id } = props;
  const [managers, setManagers] = useState<ProfileType[]>([]);
  const [state, formAction] = useActionState(inviteManagers, {
    value: null,
    message: initialState,
    isError: false,
  });
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = () => {
    closeBtnRef.current?.click();
  };

  useEffect(() => {
    if (state.message.detail && !state.isError) {
      setManagers([]);
      closeModal();
    }
  }, [state]);

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
          {state.message.usernames && (
            <p className={"label-text-alt text-error"}>
              {state.message.usernames}
            </p>
          )}
          <div className={"modal-action"}>
            {state.isError && state.message.detail && (
              <p className={"label-text-alt text-error"}>
                {state.message.detail}
              </p>
            )}
            <form action={formAction}>
              <input
                readOnly
                hidden
                name={"competition_id"}
                value={competition_id}
              />
              <input
                hidden
                readOnly
                name={"usernames"}
                value={managers.map((v) => v.username).join(",")}
              />
              <button className={"btn btn-primary"}>초대</button>
            </form>
            <form method={"dialog"}>
              <button className={"btn"} ref={closeBtnRef}>
                닫기
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

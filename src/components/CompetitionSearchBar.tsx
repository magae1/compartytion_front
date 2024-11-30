"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineSearch } from "react-icons/md";

export default function CompetitionSearchBar() {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const searchFormAction = (formData: FormData) => {
    const competitionId = formData.get("competition_id");

    if (!competitionId) {
      return;
    }

    router.push(`/competitions/${competitionId}/`);
    modalRef.current?.close();
  };

  return (
    <>
      <button
        className={"p-3 hover:opacity-50 rounded-full"}
        onClick={() => modalRef.current?.showModal()}
      >
        <MdOutlineSearch className={"text-inherit"} size={24} />
      </button>
      <dialog ref={modalRef} className={"modal items-start"}>
        <div className={"modal-box p-0 mt-5"}>
          <header className={"flex px-4"}>
            <form
              action={searchFormAction}
              className={"flex-1 flex items-center"}
            >
              <label>
                <MdOutlineSearch size={24} />
              </label>
              <input
                placeholder={"대회 코드를 입력해주세요"}
                name={"competition_id"}
                className={
                  "mx-4 h-14 bg-inherit text-base appearance-none w-full focus:outline-none"
                }
              />
            </form>
            <div className={"flex-none flex items-center"}>
              <kbd
                className={"kbd kbd-sm cursor-pointer"}
                onClick={() => modalRef.current?.close()}
              >
                esc
              </kbd>
            </div>
          </header>
        </div>
        <form method={"dialog"} className={"modal-backdrop"}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

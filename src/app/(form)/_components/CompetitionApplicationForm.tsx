"use client";
import { useRef, useActionState } from "react";

import { applyToCompetition } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { AccountType } from "@/types";
import { COMPETITION_TOOLTIPS } from "@/constants";

interface Props {
  competitionId: string;
  account: AccountType | null;
}

export interface ApplicationFormType {
  setNames: (d: string, h: string) => void;
}

const initialState: {
  email?: string[];
  displayed_name?: string[];
  hidden_name?: string[];
  introduction?: string[];
} = {};

export default function CompetitionApplicationForm(props: Props) {
  const { competitionId, account } = props;
  const [state, formAction] = useActionState(applyToCompetition, initialState);
  const displayedNameInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenNameInputRef = useRef<HTMLInputElement | null>(null);

  const setNames = (displayedName?: string, hiddenName?: string) => {
    if (displayedNameInputRef.current) {
      displayedNameInputRef.current.value = displayedName ?? "";
    }

    if (hiddenNameInputRef.current) {
      hiddenNameInputRef.current.value = hiddenName ?? "";
    }
  };

  return (
    <>
      {account && (
        <div role={"alert"} className={"alert"}>
          <p className={"col-span-full"}>참가 신청 템플릿을 불러올까요?</p>
          <button
            className={"btn btn-sm btn-info"}
            onClick={() =>
              setNames(
                account.profile.displayed_name,
                account.profile.hidden_name
              )
            }
          >
            네
          </button>
        </div>
      )}
      <form action={formAction}>
        <input name={"competition"} readOnly hidden value={competitionId} />
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>공개 이름</span>
            <span className={"label-text-alt"}>
              {COMPETITION_TOOLTIPS.DISPLAY}
            </span>
          </div>
          <input
            name={"displayed_name"}
            ref={displayedNameInputRef}
            className={"input input-bordered"}
            autoComplete={"off"}
          />
          <div className={"label flex flex-col items-start"}>
            {state.displayed_name?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>비공개 이름</span>
            <span className={"label-text-alt"}>
              {COMPETITION_TOOLTIPS.HIDDEN}
            </span>
          </div>
          <input
            name={"hidden_name"}
            className={"input input-bordered"}
            ref={hiddenNameInputRef}
            autoComplete={"off"}
          />
          <div className={"label flex flex-col items-start"}>
            {state.hidden_name?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>내 소개</span>
            <span className="label-text-alt">
              대회 관리자에게 본인을 소개해주세요.
            </span>
          </div>
          <textarea
            name={"introduction"}
            className={"textarea textarea-bordered leading-5"}
            autoComplete={"off"}
          />
          <div className={"label"}></div>
        </label>
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>이메일</span>
            <span className={"label-text-alt"}>
              중요한 알림은 이메일을 통해 전송될 수 있습니다.
            </span>
          </div>
          <input
            name={"hidden_name"}
            defaultValue={account ? account.email : ""}
            disabled={!!account}
            className={"input input-bordered"}
            autoComplete={"off"}
          />
          <div className={"label flex flex-col items-start"}>
            {state.email?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <SubmitButton>참가 신청하기</SubmitButton>
      </form>
    </>
  );
}

"use client";
import { useRef, useActionState } from "react";

import { applyToCompetition } from "@/app/actions";
import { AccountType } from "@/types";
import { COMPETITION_TOOLTIPS } from "@/constants";
import SubmitButton from "@/components/SubmitButton";

interface Props {
  competitionId: string;
  account: AccountType | null;
}

const initialState: {
  access_id?: string[];
  access_password?: string[];
  email?: string[];
  displayed_name?: string[];
  hidden_name?: string[];
  introduction?: string[];
  detail?: string;
} = {};

export default function CompetitionApplicationForm(props: Props) {
  const { competitionId, account } = props;
  const [state, formAction] = useActionState(applyToCompetition, {
    value: {
      competition: competitionId,
      access_id: "",
      access_password: "",
      email: "",
      displayed_name: "",
      hidden_name: "",
      introduction: "",
    },
    message: initialState,
    isError: false,
  });
  const displayedNameInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenNameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const setNames = (account: AccountType) => {
    if (displayedNameInputRef.current) {
      displayedNameInputRef.current.value =
        account.profile.displayed_name ?? "";
    }

    if (hiddenNameInputRef.current) {
      hiddenNameInputRef.current.value = account.profile.hidden_name ?? "";
    }

    if (emailInputRef.current) {
      emailInputRef.current.value = account.email;
    }
  };

  return (
    <>
      {account && (
        <div role={"alert"} className={"alert my-3"}>
          <p className={"col-span-full"}>참가 신청 템플릿을 불러올까요?</p>
          <button
            className={"btn btn-sm btn-info"}
            onClick={() => setNames(account)}
          >
            네
          </button>
        </div>
      )}
      <form action={formAction}>
        <input name={"competition"} readOnly hidden value={competitionId} />
        {!account && (
          <>
            <label className={"form-control"}>
              <div className={"label"}>
                <span className={"label-text"}>접속 아이디*</span>
              </div>
              <input
                name={"access_id"}
                className={"input input-bordered"}
                autoComplete={"off"}
                defaultValue={state.value.access_id}
              />
              <div className={"label flex flex-col items-start"}>
                {state.message.access_id?.map((v: string) => (
                  <p key={v} className={"label-text-alt text-error"}>
                    {v}
                  </p>
                ))}
              </div>
            </label>
            <label className={"form-control"}>
              <div className={"label"}>
                <span className={"label-text"}>접속 비밀번호*</span>
              </div>
              <input
                name={"access_password"}
                type={"password"}
                className={"input input-bordered"}
                autoComplete={"off"}
                defaultValue={state.value.access_password}
              />
              <div className={"label flex flex-col items-start"}>
                {state.message.access_password?.map((v: string) => (
                  <p key={v} className={"label-text-alt text-error"}>
                    {v}
                  </p>
                ))}
              </div>
            </label>
            <div className={"divider"}></div>
          </>
        )}
        <label className={"form-control"}>
          <div className={"label flex-wrap"}>
            <span className={"label-text"}>공개 이름*</span>
            <span className={"label-text-alt"}>
              {COMPETITION_TOOLTIPS.DISPLAY}
            </span>
          </div>
          <input
            name={"displayed_name"}
            ref={displayedNameInputRef}
            className={"input input-bordered"}
            autoComplete={"off"}
            defaultValue={state.value.displayed_name}
          />
          <div className={"label flex flex-col items-start"}>
            {state.message.displayed_name?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <label className={"form-control"}>
          <div className={"label flex-wrap"}>
            <span className={"label-text"}>비공개 이름*</span>
            <span className={"label-text-alt"}>
              {COMPETITION_TOOLTIPS.HIDDEN}
            </span>
          </div>
          <input
            name={"hidden_name"}
            className={"input input-bordered"}
            ref={hiddenNameInputRef}
            autoComplete={"off"}
            defaultValue={state.value.hidden_name}
          />
          <div className={"label flex flex-col items-start"}>
            {state.message.hidden_name?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <label className={"form-control"}>
          <div className={"label flex-wrap"}>
            <span className={"label-text"}>내 소개</span>
            <span className="label-text-alt">
              대회 관리자에게 본인을 소개해주세요.
            </span>
          </div>
          <textarea
            name={"introduction"}
            className={"textarea textarea-bordered leading-5"}
            autoComplete={"off"}
            defaultValue={state.value.introduction}
          />
          <div className={"label"}></div>
        </label>
        <label className={"form-control"}>
          <div className={"label flex-wrap"}>
            <span className={"label-text"}>이메일</span>
            <span className={"label-text-alt"}>
              중요한 알림은 이메일을 통해 전송될 수 있습니다.
            </span>
          </div>
          <input
            name={"email"}
            defaultValue={account ? account.email : ""}
            className={"input input-bordered"}
            autoComplete={"off"}
          />
          <div className={"label flex flex-col items-start"}>
            {state.message.email?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        {state.message.detail && (
          <p className={"label-text-alt text-error mb-1"}>
            {state.message.detail}
          </p>
        )}
        <SubmitButton>참가 신청하기</SubmitButton>
      </form>
    </>
  );
}

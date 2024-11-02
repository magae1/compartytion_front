"use client";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { MdSearch, MdAdd } from "react-icons/md";

import { ProfileType } from "@/types";
import { getProfile } from "@/app/actions";

interface Props {
  addManager: (p: ProfileType) => void;
}

export default function ProfileSearchForm(props: Props) {
  const { addManager } = props;
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchProfile = async () => {
    setLoading(true);
    const profile = await getProfile(searchInput).then((p) => {
      setLoading(false);
      return p;
    });
    if (profile.success) {
      addManager(profile);
    } else {
      setIsError(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProfile().then();
    }
  };

  const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setSearchInput(e.target.value);
  };

  return (
    <div className={"shadow-inner rounded my-1"}>
      <label className={"input input-bordered flex items-center gap-2 pr-2"}>
        {loading ? (
          <span className={"loading loading-spinner"}></span>
        ) : (
          <MdSearch size={24} />
        )}
        <input
          className={"w-full"}
          onChange={changeSearchInput}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={searchProfile}
          className={"btn btn-sm btn-primary btn-square"}
        >
          <MdAdd size={18} />
        </button>
      </label>
      <div className={"flex justify-end"}>
        {isError && (
          <p className={"label-text-alt mt-1 text-error"}>
            사용자를 찾을 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

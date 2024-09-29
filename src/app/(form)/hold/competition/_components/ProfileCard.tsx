import { ProfileType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";

interface Props {
  profile: ProfileType;
  handleDeletion: (p: ProfileType) => void;
}

export default function ProfileCard(props: Props) {
  const { profile, handleDeletion } = props;

  return (
    <div
      className={"btn btn-ghost w-full flex justify-between items-center group"}
      onClick={() => handleDeletion(profile)}
    >
      <div className={"flex items-center space-x-3"}>
        <div className={"w-10"}>
          <ProfileCircle profile={profile} />
        </div>
        <span>{profile.username}</span>
      </div>
      <div
        className={
          "rounded-lg h-8 w-8 flex justify-center items-center border-0 group-hover:bg-error group-hover:text-white transition-colors"
        }
      >
        <span>✕</span>
      </div>
    </div>
  );
}

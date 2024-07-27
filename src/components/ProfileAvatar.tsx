import { Avatar, AvatarProps } from "@mui/material";
import Image from "next/image";

interface Props extends AvatarProps {
  avatar_url: string | null;
  account: string;
}

export default function ProfileAvatar(props: Props) {
  const { avatar_url, account } = props;
  return (
    <Avatar {...props}>
      {avatar_url ? (
        <Image src={avatar_url} alt={`${account}'s avatar`} unoptimized fill />
      ) : (
        `${account.at(0)}`
      )}
    </Avatar>
  );
}

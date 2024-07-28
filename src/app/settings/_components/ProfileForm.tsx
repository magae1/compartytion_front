"use client";
import { ChangeEvent, useRef, useState, MouseEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  ButtonBase,
  FormControl,
  FormHelperText,
  Stack,
  styled,
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import FormInput from "@/components/FormInput";
import { ProfileType } from "@/types";
import { changeProfile } from "@/app/actions";
import { useAppDispatch } from "@/redux/hooks";
import { openAlert } from "@/redux/slices/alertSlice";
import SubmitButton from "@/components/SubmitButton";

const AvatarBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: grey[theme.palette.mode === "light" ? 800 : 300],
  borderRadius: "100%",
  fontSize: "300%",
  opacity: 0,
  transition: theme.transitions.create("opacity"),
}));

const initialState: {
  success?: boolean;
  detail?: string;
} = {};

interface Props {
  profile: ProfileType;
}

export default function ProfileForm({ profile }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePath, setImagePath] = useState(profile.avatar);
  const [state, formAction] = useFormState(changeProfile, initialState);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    const path = URL.createObjectURL(e.target.files[0]);
    setImagePath(path);
  };

  const handleClickAvatar = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    imageInputRef.current?.click();
  };

  useEffect(() => {
    if (state.success) {
      dispatch(openAlert({ message: state.detail, severity: "success" }));
      router.back();
    } else if (state.detail) {
      dispatch(openAlert({ message: state.detail, severity: "error" }));
    }
  }, [state]);

  return (
    <Box flexGrow={1} display={"flex"} gap={4} flexWrap={"wrap"}>
      <Box>
        <ButtonBase
          component={"div"}
          onClick={handleClickAvatar}
          sx={{
            borderRadius: "100%",
            position: "relative",
            "&:hover, &.Mui-focusVisible": {
              "& .MuiAvatarBackdrop-root": {
                opacity: 0.7,
              },
            },
          }}
        >
          <Avatar sx={{ height: 200, width: 200 }}>
            {imagePath ? (
              <img height={200} width={200} src={imagePath} />
            ) : (
              profile.account.at(0)
            )}
          </Avatar>
          <AvatarBackdrop className={"MuiAvatarBackdrop-root"}>
            <AddAPhoto fontSize={"inherit"} />
          </AvatarBackdrop>
        </ButtonBase>
      </Box>
      <Stack spacing={2} flexGrow={1} component={"form"} action={formAction}>
        <input
          ref={imageInputRef}
          type={"file"}
          name={"avatar"}
          hidden
          accept={"image/*"}
          onChange={handleImageChange}
        />
        <FormControl>
          <FormInput
            label_str={"공개 이름"}
            name={"displayed_name"}
            defaultValue={profile.displayed_name}
          >
            <FormHelperText>
              대회 참가 시 다른 참가자들이 볼 수 있는 이름입니다.
            </FormHelperText>
          </FormInput>
        </FormControl>
        <FormControl>
          <FormInput
            label_str={"비공개 이름"}
            name={"hidden_name"}
            defaultValue={profile.hidden_name}
          >
            <FormHelperText>
              대회 참가 시 대회 관리자들만 볼 수 있는 이름입니다.
            </FormHelperText>
          </FormInput>
        </FormControl>
        <FormControl>
          <FormInput
            label_str={"소개"}
            name={"introduction"}
            multiline
            defaultValue={profile.introduction}
          >
            <FormHelperText></FormHelperText>
          </FormInput>
        </FormControl>
        <Box>
          <SubmitButton>저장</SubmitButton>
        </Box>
      </Stack>
    </Box>
  );
}

"use client";
import { useRouter } from "next/navigation";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { useAppDispatch } from "@/redux/hooks";
import { openAlert } from "@/redux/slices/alertSlice";

type AuthSchemaType = z.infer<typeof authSchema>;

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mainFetcher
      .post("/auth/check_email/", data)
      .then((r) => {
        if (r.data.exists) {
          router.push(`/auth/login?email=${r.data.email}`);
        } else {
          router.push(`/auth/otp?email=${r.data.email}`);
        }
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.data.email) {
            setError("email", { message: e.response.data.email.join(", ") });
          }
        } else {
          dispatch(openAlert({ message: e.message, severity: "error" }));
        }
      });
  });

  return (
    <Stack spacing={1.5} component={"form"} onSubmit={onSubmit}>
      <FormControl error={!!errors.email}>
        <InputLabel>이메일</InputLabel>
        <OutlinedInput
          {...register("email")}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        />
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </FormControl>
      <Button type={"submit"}>이메일로 계속</Button>
    </Stack>
  );
}

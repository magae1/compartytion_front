"use client";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { useAppDispatch } from "@/redux/hooks";
import { openAlert } from "@/redux/slices/alertSlice";
import AuthInput from "@/app/auth/_components/AuthInput";
import SubmitButton from "@/app/auth/_components/SubmitButton";

type AuthSchemaType = z.infer<typeof authSchema>;

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
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
      <AuthInput
        label={"이메일"}
        field_error={errors.email}
        placeholder={"이메일 주소를 입력해주세요."}
        autoComplete={"username"}
        {...register("email")}
      />
      <SubmitButton disabled={isSubmitting}>이메일로 계속</SubmitButton>
    </Stack>
  );
}

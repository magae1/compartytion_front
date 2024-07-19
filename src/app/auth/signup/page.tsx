"use client";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signUpSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { openAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch } from "@/redux/hooks";
import AuthInput from "@/app/auth/_components/AuthInput";
import SubmitButton from "@/app/auth/_components/SubmitButton";

type SignUpSchemaType = z.infer<typeof signUpSchema>;

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: email ?? "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mainFetcher
      .post("/auth/signup/", {
        email: data.email,
        password: data.password,
        username: data.username,
      })
      .then((r) =>
        router.push(`/auth/login?email=${r.data.email}&signed_up=${true}`),
      )
      .catch((e) => {
        if (e.response) {
          if (e.response.data.email) {
            setError("email", { message: e.response.data.email.join(", ") });
          }
          if (e.response.data.username) {
            setError("username", {
              message: e.response.data.username.join(", "),
            });
          }
          if (e.response.data.password) {
            setError("password", {
              message: e.response.data.password.join(", "),
            });
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
      <AuthInput
        label={"사용자 이름"}
        field_error={errors.username}
        placeholder={"사용할 이름을 입력해주세요."}
        autoComplete={"off"}
        {...register("username")}
      />
      <AuthInput
        label={"비밀번호"}
        type={"password"}
        field_error={errors.password}
        placeholder={"비밀번호를 입력해주세요."}
        autoComplete={"new-password"}
        {...register("password")}
      />
      <AuthInput
        label={"비밀번호(확인)"}
        type={"password"}
        field_error={errors.confirm}
        placeholder={"비밀번호(확인)를 입력해주세요."}
        autoComplete={"new-password"}
        {...register("confirm")}
      />
      <SubmitButton disabled={isSubmitting}>새 계정으로 회원가입</SubmitButton>
    </Stack>
  );
}

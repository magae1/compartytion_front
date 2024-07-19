"use client";
import { useRouter } from "next/navigation";
import { Alert, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setCookie } from "cookies-next";

import { logInSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { openAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch } from "@/redux/hooks";
import AuthInput from "@/app/auth/_components/AuthInput";
import SubmitButton from "@/app/auth/_components/SubmitButton";
import useLocalStorage from "@/hooks/useLocalStorage";

type LogInSchemaType = z.infer<typeof logInSchema>;

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;
  const signed_up = searchParams?.signed_up;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [setItem] = useLocalStorage();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInSchemaType>({
    defaultValues: {
      email: email ?? "",
    },
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mainFetcher
      .post("/auth/login/", data)
      .then((r) => {
        setItem("access", r.data.access);
        setItem("refresh", r.data.refresh);
        setCookie("is_authenticated", true);
        router.push("/dashboard");
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.data.email) {
            setError("email", { message: e.response.data.email.join(", ") });
          }
          if (e.response.data.password) {
            setError("password", {
              message: e.response.data.password.join(", "),
            });
          }
          setError("email", {});
          setError("password", {
            message: "이메일 혹은 비밀번호를 확인해주세요.",
          });
        } else {
          dispatch(openAlert({ message: e.message, severity: "error" }));
        }
      });
  });

  return (
    <Stack spacing={1.5} component={"form"} onSubmit={onSubmit}>
      {signed_up && <Alert>회원가입에 성공했습니다!</Alert>}
      <AuthInput
        label={"이메일"}
        field_error={errors.email}
        placeholder={"이메일 주소를 입력해주세요."}
        autoComplete={"username"}
        {...register("email")}
      />
      <AuthInput
        label={"비밀번호"}
        type={"password"}
        field_error={errors.password}
        placeholder={"비밀번호를 입력해주세요."}
        autoComplete={"current-password"}
        {...register("password")}
      />
      <SubmitButton>기존 이메일로 로그인</SubmitButton>
    </Stack>
  );
}

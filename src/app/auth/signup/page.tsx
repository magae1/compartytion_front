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

import { signUpSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { openAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch } from "@/redux/hooks";

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
    formState: { errors },
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
      <FormControl error={!!errors.email}>
        <InputLabel>이메일</InputLabel>
        <OutlinedInput
          {...register("email")}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        />
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </FormControl>
      <FormControl error={!!errors.username}>
        <InputLabel>사용자 이름</InputLabel>
        <OutlinedInput
          {...register("username")}
          placeholder={"이름을 입력해주세요."}
          autoComplete={"nickname"}
        />
        <FormHelperText>{errors.username?.message}</FormHelperText>
      </FormControl>
      <FormControl error={!!errors.password}>
        <InputLabel>비밀번호</InputLabel>
        <OutlinedInput
          {...register("password")}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          autoComplete={"new-password"}
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>
      <FormControl error={!!errors.confirm}>
        <InputLabel>비밀번호(확인)</InputLabel>
        <OutlinedInput
          {...register("confirm")}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요(확인)."}
          autoComplete={"new-password"}
        />
        <FormHelperText>{errors.confirm?.message}</FormHelperText>
      </FormControl>
      <Button type={"submit"}>새 메일로 회원가입</Button>
    </Stack>
  );
}

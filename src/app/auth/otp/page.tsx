"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
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
import _ from "underscore";

import { otpSchema } from "@/schemas";
import { mainFetcher } from "@/fetchers";
import { useAppDispatch } from "@/redux/hooks";
import { openAlert } from "@/redux/slices/alertSlice";
import FancyTimer, { FanyTimerType } from "@/components/FancyTimer";

type OtpSchemaType = z.infer<typeof otpSchema>;

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
    getValues,
    formState: { errors },
  } = useForm<OtpSchemaType>({
    defaultValues: {
      email: email ?? "",
    },
    resolver: zodResolver(otpSchema),
  });
  const timerRef = useRef<FanyTimerType | null>(null);

  const onSubmit = handleSubmit((data) => {
    mainFetcher
      .post("/auth/verify_otp/", data)
      .then((r) => router.push(`/auth/signup?email=${r.data.email}`))
      .catch((e) => {
        if (e.response) {
          if (e.response.data.email) {
            setError("email", { message: e.response.data.email.join(", ") });
          }
          if (e.response.data.otp) {
            setError("otp", { message: e.response.data.otp.join(", ") });
          }
        } else {
          dispatch(openAlert({ message: e.message, severity: "error" }));
        }
      });
  });

  const requestOTP = _.debounce(() => {
    mainFetcher
      .post("/auth/request_otp/", { email: getValues("email") })
      .then((r) => {
        if (r.data) {
          timerRef.current && timerRef.current.reset(r.data.remaining_time);
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
  }, 500);

  useEffect(() => {
    requestOTP();
  }, []);

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
      <FormControl error={!!errors.otp}>
        <InputLabel>OTP</InputLabel>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 64px", gap: "2px" }}
        >
          <OutlinedInput
            {...register("otp")}
            placeholder={"OTP를 입력해주세요."}
            autoComplete={"one-time-code"}
          />
          <Button
            variant={"outlined"}
            onClick={() => requestOTP()}
            sx={{ height: "43px", marginTop: "8px", padding: "2px 4px" }}
          >
            재전송
          </Button>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 32px" }}>
          <FormHelperText>{errors.otp?.message}</FormHelperText>
          <FancyTimer variant={"caption"} ref={timerRef} />
        </Box>
      </FormControl>
      <Button type={"submit"}>확인</Button>
    </Stack>
  );
}

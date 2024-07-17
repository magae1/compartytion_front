import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({
      required_error: "이메일은 반드시 입력해야 합니다.",
    })
    .email("잘못된 이메일 형식입니다."),
});

export const logInSchema = authSchema.extend({
  password: z
    .string({
      required_error: "비밀번호는 반드시 입력해야 합니다.",
    })
    .min(8, { message: "최소 8자 이상의 비밀번호가 필요합니다." })
    .regex(/(?=.*[0-9])/, { message: "하나 이상의 숫자가 필요합니다." })
    .regex(/(?=.*[a-z])/, {
      message: "하나 이상의 영문 소문자가 필요합니다.",
    })
    .regex(/(?=.*[A-Z])/, { message: "하나 이상의 영문 대문자가 필요합니다." }),
});

export const otpSchema = authSchema.extend({
  otp: z
    .string({ required_error: "OTP를 입력해주세요." })
    .regex(/^\d{6}$/gm, "잘못된 OTP 입력입니다."),
});

export const signUpSchema = logInSchema
  .extend({
    username: z
      .string({ required_error: "사용자명은 반드시 입력해야 합니다." })
      .min(1, { message: "사용자명은 최소 1자 이상이어야 합니다." }),
    confirm: z.string({
      required_error: "비밀번호 확인은 반드시 입력해야 합니다.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  });

import { Box, Typography } from "@mui/material";

import PasswordForm from "@/app/settings/_components/PasswordForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <Typography variant={"subhead"}>내 비밀번호 변경</Typography>
      <PasswordForm />
    </Box>
  );
}

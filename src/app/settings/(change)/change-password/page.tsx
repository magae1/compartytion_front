import { Box, Typography } from "@mui/material";

import ChangePasswordForm from "@/app/settings/_components/ChangePasswordForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <Typography variant={"h4"} my={1}>
        내 비밀번호 변경
      </Typography>
      <ChangePasswordForm />
    </Box>
  );
}

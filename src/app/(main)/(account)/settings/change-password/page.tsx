import { Box } from "@mui/material";

import PasswordForm from "@/app/(main)/(account)/settings/_components/PasswordForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <PasswordForm />
    </Box>
  );
}

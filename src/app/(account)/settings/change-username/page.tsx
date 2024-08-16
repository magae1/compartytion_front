import { Box } from "@mui/material";

import UsernameForm from "@/app/(account)/settings/_components/UsernameForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <UsernameForm />
    </Box>
  );
}

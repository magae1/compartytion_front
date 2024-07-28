import { Box } from "@mui/material";

import Modal from "@/components/Modal";
import PasswordForm from "@/app/settings/_components/PasswordForm";

export default function Page() {
  return (
    <Modal>
      <Box width={"80vw"} maxWidth={350} minWidth={100}>
        <PasswordForm />
      </Box>
    </Modal>
  );
}

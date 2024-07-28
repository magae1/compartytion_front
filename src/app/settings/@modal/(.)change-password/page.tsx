import { Box } from "@mui/material";

import Modal from "@/components/Modal";
import ChangePasswordForm from "@/app/settings/_components/ChangePasswordForm";

export default function Page() {
  return (
    <Modal>
      <Box width={240}>
        <ChangePasswordForm />
      </Box>
    </Modal>
  );
}

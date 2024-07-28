import { Box } from "@mui/material";

import Modal from "@/components/Modal";
import UsernameForm from "@/app/settings/_components/UsernameForm";

export default function Page() {
  return (
    <Modal>
      <Box width={"80vw"} maxWidth={350} minWidth={100}>
        <UsernameForm />
      </Box>
    </Modal>
  );
}

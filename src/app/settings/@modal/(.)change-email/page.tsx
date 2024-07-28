import { Box } from "@mui/material";

import Modal from "@/components/Modal";
import EmailForm from "@/app/settings/_components/EmailForm";

export default function Page() {
  return (
    <Modal>
      <Box width={"80vw"} maxWidth={350} minWidth={100}>
        <EmailForm />
      </Box>
    </Modal>
  );
}

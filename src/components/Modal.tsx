"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, Modal as MuiModal } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <MuiModal
      open
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
          boxShadow: (theme) => theme.shadows[7],
        }}
      >
        <Box p={1}>
          <IconButton onClick={onClose}>
            <ArrowBack color={"inherit"} />
          </IconButton>
        </Box>
        <Box px={2} pt={1} pb={2}>
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
}

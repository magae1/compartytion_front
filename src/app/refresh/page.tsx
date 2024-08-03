"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      fetch("/api/refresh/", {
        method: "POST",
      }).then(() => {
        const path = searchParams.get("path");
        if (path) {
          router.push(decodeURI(path));
        }
        router.push("/");
      });
    } else {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress size={64} />
    </Box>
  );
}

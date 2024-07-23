import { ReactNode } from "react";
import type { Metadata } from "next";
import { Box } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { mainTheme } from "@/themes";
import StoreProvider from "@/app/StoreProvider";
import AlertToast from "@/components/AlertToast";

export const metadata: Metadata = {
  title: "Compartytion",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <Box
        component={"body"}
        sx={{
          m: 0,
          minHeight: "100vh",
          bgcolor: "var(--mui-palette-background-default)",
        }}
      >
        <StoreProvider>
          <AppRouterCacheProvider>
            <CssVarsProvider theme={mainTheme}>
              {children}
              <AlertToast />
            </CssVarsProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </Box>
    </html>
  );
}

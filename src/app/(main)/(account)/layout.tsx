import React, { ReactNode } from "react";
import {
  Container,
  Grid,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Dashboard, Settings } from "@mui/icons-material";

import AccountNavLink from "@/app/(main)/(account)/_components/AccountNavLink";
import ResponsiveNavList from "@/app/(main)/(account)/_components/ResponsiveNavList";
import AccountBreadcrumbs from "@/app/(main)/(account)/_components/AccountBreadcrumbs";

const links = [
  {
    slug: "dashboard",
    label: "대시보드",
    icon: <Dashboard color={"inherit"} />,
  },
  { slug: "settings", label: "설정", icon: <Settings color={"inherit"} /> },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container disableGutters>
      <Grid container rowGap={1}>
        <Grid item xs={12} sm={"auto"}>
          <ResponsiveNavList>
            {links.map((link) => (
              <AccountNavLink key={link.slug} slug={link.slug}>
                <ListItemIcon color={"inherit"}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </AccountNavLink>
            ))}
          </ResponsiveNavList>
        </Grid>
        <Grid item xs={12} sm>
          <Container maxWidth={false}>
            <AccountBreadcrumbs links={links} />
            {children}
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

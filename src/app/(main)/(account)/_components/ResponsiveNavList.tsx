"use client";
import { ReactNode, useState } from "react";
import {
  List,
  ListItemButton,
  useTheme,
  useMediaQuery,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props {
  children: ReactNode;
}

export default function ResponsiveNavList({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleClickMemu = () => {
    setOpen((prev) => !prev);
  };

  if (!isMobile) {
    return (
      <List component={"nav"} sx={{ minWidth: 200 }} disablePadding>
        {children}
      </List>
    );
  }

  return (
    <List
      disablePadding
      sx={{
        borderWidth: "1px 0px",
        borderColor: theme.vars.palette.divider,
        borderStyle: "solid",
        color: theme.vars.palette.text.primary,
      }}
    >
      <ListItemButton onClick={handleClickMemu}>
        <ListItemText primary={"메뉴"} />
        {open ? (
          <ExpandLess color={"inherit"} />
        ) : (
          <ExpandMore color={"inherit"} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <List
          component={"nav"}
          sx={{
            minWidth: 200,
            "& .MuiListItemButton-root": { pl: 4 },
          }}
          disablePadding
        >
          {children}
        </List>
      </Collapse>
    </List>
  );
}

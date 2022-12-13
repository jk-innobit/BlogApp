import * as React from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Inbox,
  Computer,
  Home,
  TimeToLeave,
  Nature,
  Business,
  Pets,
  ChevronLeft,
} from "@mui/icons-material";

import { Context } from "../../App";

const categories = [
  { key: 0, name: "Technology", path: "", icon: <Computer /> },
  { key: 1, name: "Cars", path: "", icon: <TimeToLeave /> },
  { key: 2, name: "Nature", path: "", icon: <Nature /> },
  { key: 3, name: "Business", path: "", icon: <Business /> },
  { key: 4, name: "Animals", path: "", icon: <Pets /> },
];

export default function Sidebar({ open, setOpen }) {
  const { userData, loggedIn } = React.useContext(Context);

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          Welcome {loggedIn && userData?.result?.name}
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="My Posts" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {categories.map((category) => (
            <ListItem key={category.key} disablePadding>
              <ListItemButton>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

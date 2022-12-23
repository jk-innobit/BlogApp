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
import { useNavigate } from "react-router-dom";

export const categories = [
  { key: 0, name: "Technology", path: "", icon: <Computer /> },
  { key: 1, name: "Cars", path: "", icon: <TimeToLeave /> },
  { key: 2, name: "Nature", path: "", icon: <Nature /> },
  { key: 3, name: "Business", path: "", icon: <Business /> },
  { key: 4, name: "Animals", path: "", icon: <Pets /> },
];

export default function Sidebar({ open, setOpen }) {
  const { loggedIn } = React.useContext(Context);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("profile"));

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
            <ListItemButton
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate(`/myposts/${userData.result._id}`);
              }}
            >
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
              <ListItemButton
                onClick={() => {
                  setOpen(false);
                  navigate(`/category/${category.name}`);
                }}
              >
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

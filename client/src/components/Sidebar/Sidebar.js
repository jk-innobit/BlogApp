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
  Toolbar,
  useMediaQuery,
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
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const private_Categories = [
  { key: 0, name: "Home", path: "/", icon: <Home /> },
  { key: 1, name: "My posts", path: "/myposts/", icon: <Inbox /> },
];

export const public_Categories = [
  {
    key: 0,
    name: "Technology",
    path: "/category/technology",
    icon: <Computer />,
  },
  { key: 1, name: "Cars", path: "/category/cars", icon: <TimeToLeave /> },
  { key: 2, name: "Nature", path: "/category/nature", icon: <Nature /> },
  { key: 3, name: "Business", path: "/category/business", icon: <Business /> },
  { key: 4, name: "Animals", path: "/category/animals", icon: <Pets /> },
];

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const TabDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function SidebarItems({ userId, setOpen, open, screen }) {
  const navigate = useNavigate();
  return (
    <>
      <List>
        {private_Categories.map((category) => (
          <ListItem disablePadding key={category.key}>
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                screen !== "tab" && setOpen(false);
                navigate(
                  category.name === "Home"
                    ? category.path
                    : `${category.path + userId}`
                );
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {category.icon}
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {public_Categories.map((category) => (
          <ListItem key={category.key} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                screen !== "tab" && setOpen(false);
                navigate(category.path);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {category.icon}
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default function Sidebar({ open, setOpen }) {
  const user = useSelector((state) => state.auth);
  const mobMin = useMediaQuery("(min-width:0px)");
  const mobMax = useMediaQuery("(max-width:599px)");
  const mobWidth = mobMin && mobMax;
  const tabMin = useMediaQuery("(min-width:600px)");
  const tabMax = useMediaQuery("(max-width:899px)");
  const tabWidth = tabMin && tabMax;
  const lapWidth = useMediaQuery("(min-width:900px)");

  return (
    <>
      {mobWidth && (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: { xs: "block", sm: "none", md: "none" } }}
        >
          <Box sx={{ width: 250 }} role="presentation">
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              Welcome {user?.authData?.name}
              <IconButton onClick={() => setOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </Typography>
            <SidebarItems
              userId={user?.authData?.id}
              setOpen={setOpen}
              open={open}
              screen={"mob"}
            />
          </Box>
        </Drawer>
      )}
      {tabWidth && (
        <TabDrawer
          variant="permanent"
          sx={{
            zIndex: open ? 1100 : 1000,
            display: { xs: "none", sm: "block", md: "none" },
          }}
          open={open}
        >
          {open && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "12px",
              }}
              variant={"body1"}
            >
              Welcome {user?.authData?.name}
              <IconButton onClick={() => setOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </Typography>
          )}
          {!open && <Toolbar />}
          <SidebarItems
            userId={user?.authData?.id}
            setOpen={setOpen}
            open={open}
            screen={"tab"}
          />
        </TabDrawer>
      )}
      {lapWidth && (
        <Drawer
          variant="permanent"
          sx={{
            zIndex: 1000,
            display: { xs: "none", sm: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <SidebarItems
            userId={user?.authData?.id}
            setOpen={setOpen}
            open={true}
            screen={"lap"}
          />
        </Drawer>
      )}
    </>
  );
}

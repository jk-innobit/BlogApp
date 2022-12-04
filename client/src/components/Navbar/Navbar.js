import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Sidebar from "../Sidebar/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../App";
import { useContext } from "react";

export default function Navbar({ setNewPost }) {
  const { loggedIn } = useContext(Context);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  // const [newPost, setNewPost] = useState(false);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  //   const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" color="primary" sx={{ height: "50px" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Sidebar open={open} setOpen={setOpen} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <IconButton sx={{ color: "white" }} onClick={() => setNewPost(true)}>
          <AddIcon fontSize="large" />
        </IconButton>
        {!loggedIn ? (
          <Button color="inherit">Login</Button>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
    // </Box>
  );
}

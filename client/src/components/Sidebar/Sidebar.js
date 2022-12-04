import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography } from "@mui/material";

export default function Sidebar({ open, setOpen }) {
  //   const toggleDrawer = (anchor, open) => (event) => {
  //     if (
  //       event &&
  //       event.type === "keydown" &&
  //       (event.key === "Tab" || event.key === "Shift")
  //     ) {
  //       return;
  //     }
  //   };
  // console.log(open);

  // const list = () => (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     //   onClick={toggleDrawer(false)}
  //     //   onKeyDown={toggleDrawer(false)}
  //   >
  //     <List>
  //       {["Home", "My Post"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["Technology", "Cars", "Nature", "Business", "Animals"].map(
  //         (text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //               </ListItemIcon>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         )
  //       )}
  //     </List>
  //   </Box>
  // );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      //   onOpen={toggleDrawer(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        //   onClick={toggleDrawer(false)}
        //   onKeyDown={toggleDrawer(false)}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          Welcome Jatin
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Typography>
        <List>
          {["Home", "My Posts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Technology", "Cars", "Nature", "Business", "Animals"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
}

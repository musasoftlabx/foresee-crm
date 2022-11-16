import React, { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { styled, useTheme, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
//import { FcBusinesswoman } from "react-icons/fc";
import { MdOutlineMenu, MdExpandMore, MdExpandLess } from "react-icons/md";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { SiHomebridge, SiMicrosoftexcel, SiMarketo } from "react-icons/si";
import { FaHospitalUser } from "react-icons/fa";
import { FcPlus, FcList } from "react-icons/fc";
import { Button } from "@mui/material";

import { getCookie } from "cookies-next";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: 0,
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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

export default function AppDrawer({ children }) {
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen((prev) => (prev = !prev));
  };

  useEffect(() => {
    if (!getCookie("__aT")) {
      router.replace("/login");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="white"
        sx={{
          boxShadow: "unset",
          px: 0,
          /* width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`, */
        }}
      >
        <Toolbar disableGutters>
          <IconButton onClick={handleDrawerClose}>
            <MdOutlineMenu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foresee CRM
          </Typography>
          <Button variant="text" onClick={() => router.replace("/login")}>
            LOGOUT
          </Button>
          {/* <IconButton onClick={handleDrawerOpen} edge="start">
            <FcBusinesswoman />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <List>
          {[
            {
              name: "Home",
              route: "/",
              icon: <SiHomebridge style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: true,
            },
            {
              name: "Create Quotation",
              route: "/quotation",
              icon: <SiMicrosoftexcel style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: false,
            },
            {
              name: "View Tickets",
              route: "/tickets",
              icon: <SiMarketo style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: false,
            },
            {
              name: "User Management",
              route: "/users",
              icon: <FaHospitalUser style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: false,
            },
            {
              name: "Categories",
              route: "/categories/",
              icon: <FaHospitalUser style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: false,
              expanded: true,
              children: [
                {
                  name: "All Categories",
                  route: "/categories/",
                  icon: <FcList style={{ width: 20, height: 20 }} />,
                  iconAlt: "",
                  selected: false,
                },
                {
                  name: "Add Category",
                  route: "/categories/add",
                  icon: <FcPlus style={{ width: 20, height: 20 }} />,
                  iconAlt: "",
                  selected: false,
                },
              ],
            },
            {
              name: "Stores",
              route: "/stores",
              icon: <FaHospitalUser style={{ width: 20, height: 20 }} />,
              iconAlt: "",
              selected: false,
            },
          ].map((parent, index) => (
            <React.Fragment key={index}>
              {/* <ListItem key={parent.name} disableGutters> */}
              <ListItemButton
                key={parent.name}
                selected={parent.route === router.route ? true : false}
                onClick={() =>
                  parent.children
                    ? (parent.expanded = !parent.expanded)
                    : router.push(parent.route)
                }
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20,
                  mr: 3,
                  "&.Mui-selected": {
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundImage:
                      "linear-gradient(to right, #77609a 0%, #d48383 100%)",
                    //borderRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopRightRadius: 20,
                    //ml: 1,
                    mr: 3,
                    boxShadow: "rgba(0, 0, 0, 0.36) 0px 10px 30px 1px",
                    transition: "transform 1s",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(to left, #77609a 0%, #d48383 100%)",
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {parent.icon}
                </ListItemIcon>
                <ListItemText
                  primary={parent.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {parent.children &&
                  (parent.expanded ? <MdExpandLess /> : <MdExpandMore />)}
              </ListItemButton>
              {parent.children && (
                <Collapse in={parent.expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {parent.children.map((child, i) => (
                      <ListItemButton
                        key={i}
                        onClick={() => router.push(child.route)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
              {/* </ListItem> */}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

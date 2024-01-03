import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Collapse from "@mui/material/Collapse";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import MuiDrawer from "@mui/material/Drawer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import SidebarUserSelect from "./SidebarUserSelect";

const drawerWidth = 300;
const headerHeight = 70;

const openedMixin = (theme) => ({
  background: "#f8f8f8",
  width: drawerWidth,
  top: headerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  top: headerHeight,
  width: `calc(${theme.spacing(2)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(2)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  flexWrap: "wrap",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  top: "50px",
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

const ListData = [
  {
    icon: <HelpCenterRoundedIcon />,
    label: "Question & Answer Generation",
    subtitle: "Generate Question & Answer",
    link: "",
  },
  {
    icon: <HelpCenterRoundedIcon />,
    label: "Image Alt Text",
    subtitle: "Generate Image Alt Text",
    link: "/abc",
  },
  {
    icon: <HelpCenterRoundedIcon />,
    label: "Contextual Alt Text",
    subtitle: "Generate Contextual Alt Text",
    link: "/test",
  },
  {
    icon: <HelpCenterRoundedIcon />,
    label: "Summarization",
    subtitle: "Generate Summary",
    link: "/djh",
  },
];

const SideBar = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (media.matches) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("mod_auth_permission");
    localStorage.removeItem("mod_auth_role");
    localStorage.removeItem("mod_auth_email");
    localStorage.removeItem("mod_auth_login");
    router.push("/login");
  };

  return (
    <>
      <Box sx={{ display: "flex" }} position="relative">
        {" "}
        <IconButton className="side-toggle-btn" onClick={handleDrawerToggle}>
          {open ? (
            <ArrowCircleLeftRoundedIcon />
          ) : (
            <ArrowCircleRightRoundedIcon />
          )}
        </IconButton>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box className="header-logo" p={2}>
              <Typography variant="h3" fontSize={20} fontWeight={600}>
                AI Workflows
              </Typography>
            </Box>
            <SidebarUserSelect />
          </DrawerHeader>
          <Divider />
          <List id="nav">
            {ListData.map((item, index) => (
              <>
                <a
                  href={item.children ? "#" : `/${item.link}`}
                  key={item.label}
                  className={pathname == `/${item.link}` ? "active" : ""}
                  onClick={item.children ? handleClick : null}
                  style={{ color: item.children ? "#6B7280" : "" }}
                >
                  <ListItem>
                    <ListItemIcon
                      sx={{
                        minWidth: "35px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item?.subtitle}
                    />
                    {item.children ? (
                      menuOpen ? (
                        <KeyboardArrowUpIcon
                          sx={{ color: "#6B7280 !important" }}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          sx={{ color: "#6B7280 !important" }}
                        />
                      )
                    ) : null}
                  </ListItem>
                </a>
                <Collapse
                  in={menuOpen}
                  orientation="vertical"
                  timeout="auto"
                  unmountOnExit
                >
                  {item.submenu?.map((items, i) => (
                    <a
                      key={items.label}
                      href={`/${items.link}`}
                      className={pathname == `/${items.link}` ? "active" : ""}
                    >
                      <ListItem style={{ paddingLeft: "30px" }}>
                        <ListItemIcon>{items.icon}</ListItemIcon>
                        <ListItemText primary={items.label} />
                      </ListItem>
                    </a>
                  ))}
                </Collapse>
              </>
            ))}
          </List>
          {/* <Box>
            <IconButton edge="end" aria-label="menu" onClick={handleLogout}>
              <Logout />{" "}
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginLeft: "8px",
                  display: "inline-block",
                }}
              >
                Logout
              </span>
            </IconButton>
          </Box> */}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;

import React from "react";
import {
  Box,
  List,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  styled,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../../assets/image/Jatayu.png";
import logo2 from "../../../assets/image/Jatayu2.png";
import MuiDrawer from "@mui/material/Drawer";
import { HomeOutlined } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;
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

// Replace with your desired custom color

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  color: "white",
  ...openedMixin(theme),
  "& .MuiDrawer-paper": {
    ...openedMixin(theme),
    backgroundColor: theme.palette.mode === "dark" ? undefined : "white",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(111.84deg, rgba(0, 4, 23, 0.94) 59.3%, rgba(0, 3, 15, 0) 100%)"
        : undefined,
  },
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: theme.palette.mode === "dark" ? undefined : "white",
      backgroundImage:
        theme.palette.mode === "dark"
          ? "linear-gradient(111.84deg, rgba(0, 4, 23, 0.94) 59.3%, rgba(0, 3, 15, 0) 100%)"
          : undefined,
    },
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Array1 = [
  { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/dashboard" },
  {
    text: "Manage Team",
    icon: <PeopleOutlinedIcon />,
    path: "/dashboard/teams",
  },
  {
    text: "Manage Organisations",
    icon: <CorporateFareIcon />,
    path: "/dashboard/organisations",
  },
  {
    text: "Manage Resources",
    icon: <CategoryIcon />,
    path: "/dashboard/resources",
  },
  {
    text: "Contacts Information",
    icon: <ContactsOutlinedIcon />,
    path: "/dashboard/contacts",
  },
  {
    text: "Invoices Balances",
    icon: <ReceiptOutlinedIcon />,
    path: "/dashboard/invoices",
  },
];

const Array2 = [
  {
    text: "Profile Form",
    icon: <PersonOutlinedIcon />,
    path: "/dashboard/form",
  },
  {
    text: "Calendar",
    icon: <CalendarTodayOutlinedIcon />,
    path: "/dashboard/calendar",
  },
  {
    text: "FAQ Page",
    icon: <HelpOutlineOutlinedIcon />,
    path: "/dashboard/faq",
  },
];

const Array3 = [
  { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/dashboard/bar" },
  {
    text: "Pie Chart",
    icon: <PieChartOutlineOutlinedIcon />,
    path: "/dashboard/pie",
  },
  {
    text: "Line Chart",
    icon: <TimelineOutlinedIcon />,
    path: "/dashboard/line",
  },
  {
    text: "Geography Chart",
    icon: <MapOutlinedIcon />,
    path: "/dashboard/geography",
  },
];

const SideBar = ({ open, handleDrawerClose }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          padding={theme.spacing(1)}
        >
          {open && (
            <Box display="flex" alignItems="center">
              <img
                src={logo2}
                alt="Logo"
                style={{
                  height: 20,
                  marginRight: 10,
                  marginLeft: 30,
                  filter:
                    theme.palette.mode === "dark"
                      ? "invert(1) grayscale(1) brightness(2)"
                      : "none", // No filter in light mode
                }}
              />
              <Typography variant="h6">Jatayu</Typography>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Box>
      </DrawerHeader>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          my: 1,
          marginTop: "30px", // Ensure you're using valid units like px, em, rem, etc.
          marginBottom: "30px",
        }}
      >
        <Avatar
          sx={{
            width: 44,
            height: 44,
            border: "2px solid grey",
            transition: "0.25s",
          }}
          alt="Remy Sharp"
          src={logo}
        />
        {open && (
          <Box display="flex" flexDirection="column" alignItems="center" ml={2}>
            <Typography
              align="center"
              sx={{
                fontSize: 13,
                transition: "0.25s",
                color: "#4763E4",
              }}
            >
              Shiv Shakti
            </Typography>
            <Typography
              align="center"
              sx={{
                fontSize: 13,
                transition: "0.25s",
              }}
            >
              Admin
            </Typography>
          </Box>
        )}
      </Box>

      <List>
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? "#1A1F37"
                        : grey[300]
                      : "transparent",
                  backdropFilter: "blur(10px)", // Apply blur effect
                  borderRadius: "10px", // Optional: for rounded corners
                  transition:
                    "background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? grey[800]
                          : grey[300]
                        : "rgba(255, 255, 255, 0.1)", // Light background on hover
                    backdropFilter: "blur(10px)", // Keep blur effect on hover
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow on hover
                  },
                  boxShadow:
                    location.pathname === item.path
                      ? "0 4px 6px rgba(0, 0, 0, 0.1)" // Shadow for selected item
                      : "none",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#4763E4",
                    borderRadius: "15%", // Ensures the background is circular
                    padding: "2px", // Adjust padding as needed
                    fontSize: "1.5rem", // Adjust size as needed
                    marginRight: open ? "20px" : "0", // Apply margin-right based on the drawer state
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "white", // Change icon color if needed to contrast with background
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Box>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {Array2.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? "#1A1F37"
                        : grey[300]
                      : "transparent",
                  backdropFilter: "blur(10px)", // Apply blur effect
                  borderRadius: "10px", // Optional: for rounded corners
                  transition:
                    "background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? grey[800]
                          : grey[300]
                        : "rgba(255, 255, 255, 0.1)", // Light background on hover
                    backdropFilter: "blur(10px)", // Keep blur effect on hover
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow on hover
                  },
                  boxShadow:
                    location.pathname === item.path
                      ? "0 4px 6px rgba(0, 0, 0, 0.1)" // Shadow for selected item
                      : "none",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#4763E4",
                    borderRadius: "15%", // Ensures the background is circular
                    padding: "2px", // Adjust padding as needed
                    fontSize: "1.5rem", // Adjust size as needed
                    marginRight: open ? "20px" : "0", // Apply margin-right based on the drawer state
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "white", // Change icon color if needed to contrast with background
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Box>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {Array3.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? "#1A1F37"
                        : grey[300]
                      : "transparent",
                  backdropFilter: "blur(10px)", // Apply blur effect
                  borderRadius: "10px", // Optional: for rounded corners
                  transition:
                    "background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? grey[800]
                          : grey[300]
                        : "rgba(255, 255, 255, 0.1)", // Light background on hover
                    backdropFilter: "blur(10px)", // Keep blur effect on hover
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow on hover
                  },
                  boxShadow:
                    location.pathname === item.path
                      ? "0 4px 6px rgba(0, 0, 0, 0.1)" // Shadow for selected item
                      : "none",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#4763E4",
                    borderRadius: "15%", // Ensures the background is circular
                    padding: "2px", // Adjust padding as needed
                    fontSize: "1.5rem", // Adjust size as needed
                    marginRight: open ? "20px" : "0", // Apply margin-right based on the drawer state
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "white", // Change icon color if needed to contrast with background
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Box>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;

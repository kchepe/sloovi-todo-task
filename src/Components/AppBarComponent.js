import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SideBarComponent from "./SideBarComponent";
import MainView from "./MainView";

const drawerWidth = 240;

const AppBarComponent = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <SideBarComponent drawerWidth={drawerWidth} />
      <MainView />
    </Box>
  );
};

export default AppBarComponent;

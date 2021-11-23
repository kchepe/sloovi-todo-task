import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TaskFormComponent from "./TaskFormComponent/TaskFormComponent";

const MainView = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <TaskFormComponent />
      </Box>
    </>
  );
};

export default MainView;

import React, { useState } from "react";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import { Grid, Paper } from "@mui/material";
import FormComponent from "./FormComponent";
import CardComponent from "./CardComponent";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  paper: {
    border: "2px solid #f3f3f3",
  },
  box: {
    padding: "24px 16px",
  },
}));

const TaskFormComponent = () => {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);
  const [taskById, setTaskById] = useState({});
  const [formType, setFormType] = useState("addForm");

  const task = useSelector((state) => state.tasks);

  const handleShowForm = (data, index, type) => {
    setDisplayForm(true);
    setFormType(type);
    setTaskById({ data, index });
  };

  const handleHideForm = () => {
    setDisplayForm(false);
  };

  if (task.hasError)
    return (
      <div>Server Error. Please refresh page or contact system support.</div>
    );
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <Paper elevation={0} className={classes.paper}>
            <Header handleShowForm={handleShowForm} />
            <Box className={classes.box}>
              {displayForm ? (
                <FormComponent
                  handleHideForm={handleHideForm}
                  taskById={taskById}
                  formType={formType}
                />
              ) : (
                <CardComponent handleShowForm={handleShowForm} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskFormComponent;

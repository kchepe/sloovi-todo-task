import { Create, Delete } from "@mui/icons-material";
import { Paper, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreator } from "../../redux/index";
import { bindActionCreators } from "redux";
import React, { useEffect } from "react";

const useStyles = makeStyles(() => ({
  root: {},
  img: {
    width: 50,
    height: 50,
    marginRight: "15px",
  },
  paper: {
    border: "2px solid #f3f3f3",
    marginBottom: "15px",
    padding: "16px",
    borderRadius: "10px",
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  emptyTask: {
    width: "100%",
    textAlign: "center",
  },
}));

const CardComponent = (props) => {
  const { handleShowForm } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleGetTasks, handleGetUsers, handleDelete } = bindActionCreators(
    ActionCreator,
    dispatch
  );
  const tasks = useSelector((state) => state.tasks);
  const users = useSelector((state) => state.users);

  const handleDeleteConfirm = (id) => {
    const confirm = window.confirm("Delete Task?");
    if (confirm) {
      handleDelete(id);
    }
  };

  useEffect(() => {
    handleGetTasks();
    handleGetUsers();
  }, []);
  return (
    <div>
      {tasks.data.length === 0 ? (
        <div className={classes.emptyTask}>Task list is empty.</div>
      ) : (
        <div>
          {tasks.data.map((task, i) => (
            <Paper elevation={0} className={classes.paper} key={i}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <div className={classes.imgContainer}>
                    {users.data.map((user, i) => (
                      <div key={i}>
                        {user.first === task.assigned_user && (
                          <img
                            src={user.icon}
                            alt={user.name}
                            className={classes.img}
                          />
                        )}
                      </div>
                    ))}
                    <div>
                      <Stack>
                        <span>
                          <b>{task.task_msg}</b>
                        </span>
                        <span>{task.task_date}</span>
                      </Stack>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <Tooltip title="Edit Task">
                    <IconButton
                      disableRipple
                      onClick={() => handleShowForm(task, i, "updateForm")}
                    >
                      <Create />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton
                      disableRipple
                      onClick={() => handleDeleteConfirm(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardComponent;

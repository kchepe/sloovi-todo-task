import { Add } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    borderBottom: "2px solid #f3f3f3",
    background: "#f7f7f7",
  },
  addBtn: {
    borderRadius: "0px",
    width: "100%",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  headerLabel: {
    flex: 3,
    padding: "0px 16px",
    display: "flex",
  },
  addBtnContainer: {
    flex: 0.4,
    textAlign: "center",
    padding: "0px",
    borderLeft: "2px solid #f3f3f3",
  },
}));

const Header = (props) => {
  const { handleShowForm } = props;
  const tasks = useSelector((state) => state.tasks);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <div className={classes.headerLabel}>
          <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
            <b>TASKS</b>
          </Typography>
          <Typography variant="subtitle1">
            <b>{tasks.data.length}</b>
          </Typography>
        </div>
        <div className={classes.addBtnContainer}>
          <IconButton
            disableRipple
            className={classes.addBtn}
            size="large"
            onClick={() => handleShowForm({}, null, "addForm")}
          >
            <Add />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;

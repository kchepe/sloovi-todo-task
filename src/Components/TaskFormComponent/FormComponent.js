import {
  Button,
  Grid,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreator } from "../../redux/index";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

const useStyles = makeStyles(() => ({
  helpertxt: {
    color: "#e53935",
    fontSize: "11px",
    marginLeft: "14px",
  },
  saveBtn: {
    background: "#28a745 !important",
    marginLeft: "10px",
  },
}));

const initialFormData = {
  task: "",
  date: null,
  time: "",
  user: "",
};

const schema = yup.object().shape({
  task: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  user: yup.string().required(),
});

const FormComponent = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { handleGetUsers, handleAddTask, handleUpdateTask } =
    bindActionCreators(ActionCreator, dispatch);
  const { handleHideForm, taskById, formType } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleCancel = () => {
    reset(initialFormData);
    handleHideForm();
  };

  const handleAdd = async (data) => {
    const { task, date, time, user } = data;
    const newDate = new Date(date).toLocaleDateString();
    const a = time.split(":");
    const totalSeconds = +a[0] * 60 * 60 + +a[1] * 60;
    const newFormatDate = format(new Date(newDate), "yyyy-MM-dd");
    const timeZone = new Date().getTimezoneOffset();

    if (formType === "addForm") {
      await handleAddTask({
        assigned_user: user,
        task_date: newFormatDate,
        is_completed: 0,
        time_zone: timeZone,
        task_msg: task,
        task_time: totalSeconds,
      });
    }

    await handleUpdateTask(taskById.index, taskById.data.id, {
      assigned_user: user,
      task_date: newFormatDate,
      is_completed: 0,
      time_zone: timeZone,
      task_msg: task,
      task_time: totalSeconds,
    });
    handleCancel();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <span>
                <b>Task Description</b>
              </span>
              <Controller
                name="task"
                control={control}
                defaultValue={
                  formType === "addForm" ? "" : taskById.data.task_msg
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.task}
                    helperText={errors.task && errors.task.message}
                    sx={{ marginTop: "10px" }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <span>
                <b>Date</b>
              </span>
              <Controller
                name="date"
                control={control}
                defaultValue={
                  formType === "addForm"
                    ? ""
                    : format(new Date(taskById.data.task_date), "MM/dd/yyyy")
                }
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                      {...field}
                      inputFormat="MM/dd/yyyy"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          value=""
                          color="primary"
                          size="small"
                          error={!!errors.date}
                          helperText={errors.date && "Date is required"}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <span>
                <b>Time</b>
              </span>
              <Controller
                name="time"
                control={control}
                defaultValue={
                  formType === "addForm"
                    ? ""
                    : new Date(taskById.data.task_time * 1000)
                        .toISOString()
                        .substr(11, 8)
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    type="time"
                    size="small"
                    error={!!errors.time}
                    helperText={errors.task && "Time is required"}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <span>
                <b>Assign User</b>
              </span>
              <Controller
                name="user"
                control={control}
                defaultValue={
                  formType === "addForm" ? "" : taskById.data.assigned_user
                }
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      error={!!errors.user}
                    >
                      {users.data.map((user, i) => (
                        <MenuItem value={user.first} key={i}>
                          {user.first}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.user && (
                      <FormHelperText className={classes.helpertxt}>
                        {errors.user.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.saveBtn}
              type="submit"
            >
              {formType === "addForm" ? "Save" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormComponent;

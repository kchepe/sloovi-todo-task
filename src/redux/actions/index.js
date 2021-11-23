import { TasksAction } from "./ActionType";
import axios from "axios";

const url = process.env.REACT_APP_URL;
const token = process.env.REACT_APP_TOKEN;
const companyId = process.env.REACT_APP_COMPANY_ID;
const lead = process.env.REACT_APP_COMPANY_LEAD;

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const handleGetTasks = () => {
  return async (dispatch) => {
    const res = await axiosInstance.get(
      `/task/${lead}?company_id=${companyId}`
    );
    try {
      dispatch({
        type: TasksAction.GET_ALL_TASKS,
        payload: { data: res.data.results, hasError: false },
      });
    } catch (err) {
      dispatch({
        type: TasksAction.GET_ALL_TASKS,
        payload: { data: [], hasError: true },
      });
    }
  };
};

export const handleGetUsers = () => {
  return async (dispatch) => {
    const res = await axiosInstance.get(
      `/team?product=outreach&company_id=${companyId}`
    );
    try {
      dispatch({
        type: TasksAction.GET_ALL_ASSIGNED_USERS,
        payload: { data: res.data.results.data, hasError: false },
      });
    } catch (err) {
      dispatch({
        type: TasksAction.GET_ALL_ASSIGNED_USERS,
        payload: { data: [], hasError: true },
      });
    }
  };
};

export const handleAddTask = (task) => {
  return async (dispatch) => {
    await axiosInstance.post(`/task/${lead}?company_id=${companyId}`, task);
    try {
      dispatch({
        type: TasksAction.ADD_TASK,
        payload: { task: task, hasError: false },
      });
    } catch (err) {
      dispatch({
        type: TasksAction.ADD_TASK,
        payload: { task: {}, hasError: true },
      });
    }
  };
};

export const handleDelete = (id) => {
  return async (dispatch) => {
    await axiosInstance.delete(`/task/${lead}/${id}?company_id=${companyId}`);
    try {
      dispatch({
        type: TasksAction.DELETE_TASK,
        payload: { taskId: id, hasError: false },
      });
    } catch (err) {
      dispatch({
        type: TasksAction.DELETE_TASK,
        payload: { taskId: null, hasError: true },
      });
    }
  };
};

export const handleUpdateTask = (index, id, task) => {
  return async (dispatch) => {
    await axiosInstance.put(
      `/task/${lead}/${id}?company_id=${companyId}`,
      task
    );
    try {
      dispatch({
        type: TasksAction.UPDATE_TASK,
        payload: { index, task, hasError: false },
      });
    } catch {
      dispatch({
        type: TasksAction.UPDATE_TASK,
        payload: { index: null, task: {}, hasError: true },
      });
    }
  };
};

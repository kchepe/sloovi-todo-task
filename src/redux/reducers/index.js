import { combineReducers } from "redux";
import usersReducer from "./AssignedUsers";
import tasksReducer from "./TasksReducer";

const reducers = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
});
export default reducers;

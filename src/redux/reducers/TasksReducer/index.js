import { TasksAction } from "../../actions/ActionType";

const initalState = {
  data: [],
  hasError: false,
};

const tasksReducer = (state = initalState, action) => {
  const newDataArray = state.data;
  switch (action.type) {
    case TasksAction.GET_ALL_TASKS:
      return action.payload;
    case TasksAction.DELETE_TASK:
      const filteredData = newDataArray.filter(
        (arr) => arr.id !== action.payload.taskId
      );
      return {
        data: filteredData,
        hasError: action.payload.hasError,
      };
    case TasksAction.ADD_TASK:
      const newTask = [...newDataArray, action.payload.task];
      const newInitalState = {
        data: newTask,
        hasError: action.payload.hasError,
      };
      return newInitalState;
    case TasksAction.UPDATE_TASK:
      const updatedTask = [...newDataArray];
      updatedTask[action.payload.index] = action.payload.task;
      return {
        data: updatedTask,
        hasError: action.payload.hasError,
      };
    default:
      return state;
  }
};

export default tasksReducer;

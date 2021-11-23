import { TasksAction } from "../../actions/ActionType";

const initialUserState = {
  data: [],
  hasError: false,
};

const usersReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case TasksAction.GET_ALL_ASSIGNED_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;

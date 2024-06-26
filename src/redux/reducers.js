
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  REMOVE_TASK_REQUEST,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAILURE,
} from './actions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
    case ADD_TASK_REQUEST:
    case UPDATE_TASK_STATUS_REQUEST:
    case REMOVE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case FETCH_TASKS_FAILURE:
    case ADD_TASK_FAILURE:
    case UPDATE_TASK_STATUS_FAILURE:
    case REMOVE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, completed: action.payload.completed }
            : task
        ),
      };
    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default tasksReducer;

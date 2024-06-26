import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_TASKS_REQUEST,
  fetchTasksSuccess,
  fetchTasksFailure,
  ADD_TASK_REQUEST,
  addTaskSuccess,
  addTaskFailure,
  UPDATE_TASK_STATUS_REQUEST,
  updateTaskStatusSuccess,
  updateTaskStatusFailure,
  REMOVE_TASK_REQUEST,
  removeTaskSuccess,
  removeTaskFailure,
} from './actions';

// Dummy task list for simulation
const dummyTasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: false },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: true },
];

// Simulate fetching tasks from an API
function* fetchTasks() {
  try {
    // Simulate an API call
    const tasks = yield call(() => new Promise((resolve) => setTimeout(() => resolve(dummyTasks), 1000)));
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// Simulate adding a task to an API
function* addTask(action) {
  try {
    // Simulate an API call to add a task
    const newTask = action.payload;
    yield call(() => new Promise((resolve) => setTimeout(() => resolve(newTask), 500)));
    yield put(addTaskSuccess(newTask));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

// Simulate updating a task status in an API
function* updateTaskStatus(action) {
  try {
    // Simulate an API call to update task status
    const { taskId, completed } = action.payload;
    yield call(() => new Promise((resolve) => setTimeout(() => resolve(), 500)));
    yield put(updateTaskStatusSuccess(taskId, completed));
  } catch (error) {
    yield put(updateTaskStatusFailure(error.message));
  }
}

// Simulate removing a task from an API
function* removeTask(action) {
  try {
    // Simulate an API call to remove a task
    yield call(() => new Promise((resolve) => setTimeout(() => resolve(), 500)));
    yield put(removeTaskSuccess(action.payload));
  } catch (error) {
    yield put(removeTaskFailure(error.message));
  }
}

function* watchFetchTasks() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks);
}

function* watchAddTask() {
  yield takeEvery(ADD_TASK_REQUEST, addTask);
}

function* watchUpdateTaskStatus() {
  yield takeEvery(UPDATE_TASK_STATUS_REQUEST, updateTaskStatus);
}

function* watchRemoveTask() {
  yield takeEvery(REMOVE_TASK_REQUEST, removeTask);
}

export default function* rootSaga() {
  yield all([watchFetchTasks(), watchAddTask(), watchUpdateTaskStatus(), watchRemoveTask()]);
}

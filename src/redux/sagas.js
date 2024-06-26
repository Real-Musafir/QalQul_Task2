// src/redux/sagas.js

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

// Simulated API functions
const dummyFetchTasks = () => new Promise(resolve => {
  setTimeout(() => resolve([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: false },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: true },
    { id: 4, title: 'Task 4', description: 'Description for Task 4', completed: false },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', completed: true },
    { id: 6, title: 'Task 6', description: 'Description for Task 6', completed: true },

  ]), 1000);
});

const dummyAddTask = (task) => new Promise(resolve => {
  setTimeout(() => resolve(task), 500);
});

const dummyUpdateTaskStatus = (taskId, completed) => new Promise(resolve => {
  setTimeout(() => resolve({ taskId, completed }), 500);
});

const dummyRemoveTask = (taskId) => new Promise(resolve => {
  setTimeout(() => resolve(), 500);
});

// Sagas for handling tasks
function* fetchTasks() {
  try {
    const tasks = yield call(dummyFetchTasks);
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* addTask(action) {
  try {
    const newTask = yield call(dummyAddTask, action.payload);
    yield put(addTaskSuccess(newTask));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

function* updateTaskStatus(action) {
  try {
    const { taskId, completed } = action.payload;
    yield call(dummyUpdateTaskStatus, taskId, completed);
    yield put(updateTaskStatusSuccess(taskId, completed));
  } catch (error) {
    yield put(updateTaskStatusFailure(error.message));
  }
}

function* removeTask(action) {
  try {
    yield call(dummyRemoveTask, action.payload);
    yield put(removeTaskSuccess(action.payload));
  } catch (error) {
    yield put(removeTaskFailure(error.message));
  }
}

// Watchers
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

// Root saga
export default function* rootSaga() {
  yield all([
    watchFetchTasks(),
    watchAddTask(),
    watchUpdateTaskStatus(),
    watchRemoveTask(),
  ]);
}

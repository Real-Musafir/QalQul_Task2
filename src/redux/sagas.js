import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_TASKS_REQUEST, fetchTasksSuccess, fetchTasksFailure } from './actions';

// Dummy task list for simulation
const dummyTasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: false },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: true },
  { id: 4, title: 'Task4', description: 'Description for Task 4', completed: true },
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

function* watchFetchTasks() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks);
}

export default watchFetchTasks;

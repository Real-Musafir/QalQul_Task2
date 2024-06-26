import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import tasksReducer from './reducers';
import watchFetchTasks from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  tasksReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchFetchTasks);

export default store;

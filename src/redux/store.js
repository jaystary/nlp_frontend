import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddlware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./sagas";

// Create Redux Logger
const logger = createLogger({
  collapsed: true,
});

// Create Store with redux-saga
export default function configureStore(initialState = {}) {
  const sagaMiddlware = createSagaMiddlware();

  const getMiddlware = () => {
    if (process.env.NODE_ENV === "development") {
      return applyMiddleware(sagaMiddlware, logger);
    }

    return applyMiddleware(sagaMiddlware);
  };

  const store = createStore(
    reducer,
    initialState,
    getMiddlware()
  );

  sagaMiddlware.run(rootSaga);
  return store;
}
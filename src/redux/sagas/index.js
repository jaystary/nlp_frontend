import { all } from "redux-saga/effects";
import { messageSaga } from "./message";

// Define the rootSaga
export default function* rootSaga() {
  yield all([
    messageSaga(),
  ]);
}
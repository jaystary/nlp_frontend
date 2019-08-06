import { all, takeLatest } from "redux-saga/effects";
import * as types from "../contstants";

function* sendMessage(action) {
}

export function* messageSaga() {
  yield all([
    takeLatest(types.SEND_MESSAGE, sendMessage),
  ])
}

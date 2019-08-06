import { handleActions } from "redux-actions";
import * as types from "../contstants";

// Define the Socket initial store
const socketState = {
 socket: null,
};

// Define the socketReducer with initialState
export default handleActions({
  [types.SET_SOCKET]: (state, action) => {
    return { ...state, socket: action.payload };
  },
}, socketState);
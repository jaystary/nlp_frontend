import { handleActions } from "redux-actions";
import * as types from "../contstants";

// Define the Message initial store
const messageState = {
  messages: [],
  currentMessage: "",
  loading: false,
}

// Define the messageReducer with initialState
export default handleActions({
  [types.SEND_MESSAGE]: (state) => {
    return { ...state, loading: true };
  },
  [types.SEND_MESSAGE_SUCCESS]: (state, action) => {
    return { ...state, loading: false, currentMessage: action.data };
  },
  [types.SEND_MESSAGE_FAIL]: (state, action) => {
    return { ...state, loading: false, currentMessage: "", error: action.payload };
  },
  [types.SET_CURRENT_MESSAGE]: (state, action) => {
    return { ...state, currentMessage: action.payload };
  },
  [types.APPEND_MESSAGE]: (state, action) => {
    return { ...state, messages: [...state.messages, ...action.payload] };
  } 
}, messageState);
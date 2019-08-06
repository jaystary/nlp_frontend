import { combineReducers } from "redux";
import messageReducer from "./message";
import playerReducer from "./player";
import tableReducer from "./table";
import socketReducer from "./socket";

// Define the rootReducer
export default combineReducers({
  messageReducer,
  playerReducer,
  tableReducer,
  socketReducer,
});


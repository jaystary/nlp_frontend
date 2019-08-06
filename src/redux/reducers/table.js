import { handleActions } from "redux-actions";
import * as types from "../contstants";
import _ from "lodash";

// Define the Table initial store
const tableState = {
  tableData: [
    {
      id: "1",
      date: "12.23.2910",
      duration: "1.40",
      title: "Hello World",
      download: "",
      delete: "",
    },
    {
      id: "2",
      date: "12.23.2910",
      duration: "1.50",
      title: "Hello World",
      download: "",
      delete: "",
    },
    {
      id: "3",
      date: "12.23.2910",
      duration: "1.60",
      title: "Hello World",
      download: "",
      delete: "",
    },
  ],
};

// Define the tableReducer with initialState
export default handleActions({
  [types.SET_TABLE_DATA]: (state, action) => {
    return { ...state, tableData: [...state.tableData, ...action.payload]};
  },
  [types.DELETE_TABLE_DATA]: (state, action) => {
    console.log("reducer:", action.payload);
    return { ...state, tableData: _.filter(state.tableData, (item) => {
      return item.id !== action.payload.id;
    })};
  },
}, tableState);


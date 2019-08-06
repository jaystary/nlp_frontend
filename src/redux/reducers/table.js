import { handleActions } from "redux-actions";
import * as types from "../contstants";
import _ from "lodash";

// Define the Table initial store
const tableState = {
  tableData: [
    
  ],
};

// Define the tableReducer with initialState
export default handleActions({
  [types.SET_TABLE_DATA]: (state, action) => {
    return { state, tableData: [state.tableData, ...action.payload]};
  },
  [types.DELETE_TABLE_DATA]: (state, action) => {
    console.log("reducer:", action.payload);
    return { ...state, tableData: _.filter(state.tableData, (item) => {
      return item.id !== action.payload.id;
    })};
  },
}, tableState);


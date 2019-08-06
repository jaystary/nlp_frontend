import { handleActions } from "redux-actions";
import * as types from "../contstants";

// Define the Player initial store
const playerState = {
  playerData: [
  ],
  playerURLs: [
  ],
  startIndex: 0,
  loading: false,
};

// Define the playerReducer with initialState
export default handleActions({
  [types.SET_PLAYER_URLS]: (state, action) => {
    return { ...state, playerURLs: [...state.playerURLs, ...action.payload] };
  },
  [types.SET_PLAYER_DATA]: (state, action) => {
    return { ...state, playerData: [...state.playerData, ...action.payload] };
  },
  [types.SET_CURRENT_URL]: (state, action) => {
    return { ...state, playerURLs: [action.payload] };
  },
  [types.CLEAR_PLAYERS]: (state) => {
    return { ...state, playerData: [], playerURLs: [], startIndex: 0 };
  },
  [types.PLAYER_START_INDEX]: (state, action) => {
    return { ...state, startIndex: action.payload }
  },
}, playerState);

import { handleActions } from "redux-actions";
import * as types from "../contstants";

// Define the Player initial store
const playerState = {
  playerData: [
  ],
  playerURLs: [
  ],
  currentPlayerURL: "",
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
}, playerState);

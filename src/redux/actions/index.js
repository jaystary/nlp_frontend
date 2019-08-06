import { createAction } from "redux-actions";
import * as types from "../contstants";

// Message actions
export const sendMessage = createAction(types.SEND_MESSAGE);
export const setCurrentMessage = createAction(types.SET_CURRENT_MESSAGE);
export const appendMessage = createAction(types.APPEND_MESSAGE);
export const clearMessages = createAction(types.CLEAR_MESSAGES);

// Player actions
export const setPlayerURLs = createAction(types.SET_PLAYER_URLS);
export const setPlayerData = createAction(types.SET_PLAYER_DATA);
export const setCurrentURL = createAction(types.SET_CURRENT_URL);
export const clearPlayers = createAction(types.CLEAR_PLAYERS);
export const setStartIndex = createAction(types.PLAYER_START_INDEX);

// Table actions
export const setTableData = createAction(types.SET_TABLE_DATA);
export const deleteTableData = createAction(types.DELETE_TABLE_DATA);

// Socket actions
export const setSocket = createAction(types.SET_SOCKET);
import { createSelector } from "reselect";

// Store Variable
const message = state => state.messageReducer;
const player = state => state.playerReducer;
const table = state => state.tableReducer;
const socket = state => state.socketReducer;

// Message Selectors
export const makeCurrentMessage = createSelector(message, message => message.currentMessage);

// Player Selectors
export const makePlayerData = createSelector(player, player => player.playerData);
export const makePlayerURLs = createSelector(player, player => player.playerURLs);

// Table Selectors
export const makeTableData = createSelector(table, table => table.tableData);

// Socket Selectors
export const makeSocket = createSelector(socket, socket => socket.socket);
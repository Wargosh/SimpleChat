import { AddMessageUI, updateUsername, AddMsgServerUI, updateRoomname } from "./ui.js";

const socket = io();

// CHAT
export const loadChats = (callback) => {
  socket.on("chat:loadmessages", callback);
};

export const saveMessage = (msg) => {
  socket.emit("chat:globalmessage", msg);
};

socket.on("chat:globalmessage", (data) => {
  AddMessageUI(data);
});

// ROOMS
export const loadUsers = (callback) => {
  socket.on("room:loadusers", callback);
};

export const loadRooms = (callback) => {
  socket.on("room:loadrooms", callback);
};

export const changeRoom = (newRoom) => {
  console.log("change room to:" + newRoom);
  socket.emit("room:changeroom", newRoom);
  updateRoomname(newRoom);
};

// SERVER
socket.on("room:msgserver", (data) => {
  AddMsgServerUI(data);
});
socket.on("infoConnection", (data) => {
  updateUsername(data);
});

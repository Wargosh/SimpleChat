import { loadChats, loadUsers, loadRooms, changeRoom } from "./socket.js";
import {
  onHandleSubmit,
  renderMessages,
  renderUsers,
  renderRooms,
} from "./ui.js";

// HTML
const msgForm = document.getElementById("msgForm");
msgForm.addEventListener("submit", onHandleSubmit);

loadChats(renderMessages);
loadUsers(renderUsers);
loadRooms(renderRooms);

// const roomsUI = document.getElementsByName("room")
// console.log("rooms UI:", roomsUI);


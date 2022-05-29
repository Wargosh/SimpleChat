import { loadChats, loadUsers, loadRooms } from "./socket.js";
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

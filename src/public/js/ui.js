import { saveMessage, changeRoom } from "./socket.js";
import { updateScroll, escapeHtml } from "./utils.js";

const msg = {
  username: null,
  img_username: "user.png",
  room: "GENERAL",
  message: null,
  createdAt: null,
};

// HTML
const messagesUI = document.getElementById("messages");
const usersUI = document.getElementById("users");
const roomsUI = document.getElementById("rooms");
const myUsername = document.getElementById("myusername");
const myStatus = document.getElementById("mystatus");
const roomName = document.getElementById("RoomName");
const titleUsers = document.getElementById("titleUsers");

export const onHandleSubmit = (e) => {
  e.preventDefault();

  const dd = new Date(Date.now()).toLocaleString();
  msg.message = escapeHtml(msgForm.msg.value);
  msg.createdAt = escapeHtml(dd);

  // enviar msg a server
  saveMessage(msg);
  AddOwnMessageUI(msg);
  msgForm.msg.value = "";
};

export const renderMessages = (msgs) => {
  console.log("msgs", msgs);
  messagesUI.innerHTML = " ";
  msgs.forEach((m) => {
    if (m.username == msg.username) {
      AddOwnMessageUI(m);
    } else {
      AddMessageUI(m);
    }
  });

  serverMessagePresentation();
};

export const renderUsers = (usrs) => {
  console.log("users ", usrs);
  updateUsersCount(usrs.length);
  usersUI.innerHTML = " ";
  usrs.forEach((usr) => {
    AddUserUI(usr);
  });
};

export const renderRooms = (rooms) => {
  console.log("rooms ", rooms);
  roomsUI.innerHTML = " ";
  rooms.forEach((r) => {
    AddRoomUI(r);
  });

  rooms.forEach((r) => {
    console.log(document.getElementById(r.name));
    document
      .getElementById(r.name)
      .addEventListener("click", onclickHandler_ChangeRoom, false);
  });
};

function onclickHandler_ChangeRoom(zEvent) {
  var idRoom = this.getAttribute("data-room");
  msg.room = idRoom;
  changeRoom(idRoom);
}

// Agregar mensajes
export const AddMessageUI = (data) => {
  const html = `<div class="flex mb-8">
                    <img src="./images/${data.img_username}" class="self-end rounded-full w-12 mr-4" alt="">
                    <div class="flex flex-col">
                        <div class="bg-white px-4 py-3 w-96 rounded-3xl rounded-bl-none shadow-sm mb-1">
                            <p class="font-medium mb-1">${data.username}</p>
                            <small class="text-gray-500 font-light">${data.message}</small>
                        </div>
                        <small class="text-gray-500 font-light">${data.createdAt}</small>
                    </div>
                </div>`;
  messagesUI.innerHTML += html;
  updateScroll();
};

function AddOwnMessageUI(data) {
  const html = `<div class="flex mb-8 flex-row-reverse">
                    <img src="./images/${data.img_username}" class="self-end rounded-full w-12 ml-4" alt="">
                    <div class="flex flex-col">
                        <div class="bg-blue-500 px-4 py-3 w-96 rounded-3xl rounded-br-none shadow-sm mb-1">
                            <p class="font-medium text-white mb-1 flex flex-row-reverse">${data.username}</p>
                            <small class="text-gray-100 font-light">${data.message}</small>
                        </div>
                        <small class="text-gray-500 font-light self-end">${data.createdAt}</small>
                    </div>
                </div>`;
  messagesUI.innerHTML += html;
  updateScroll();
}

// add user
function AddUserUI(data) {
  const html = `<div class="flex bg-gray-100 rounded p-2 mb-2 hover:bg-gray-200 cursor-pointer">
                    <img src="./images/${data.img_username}" class="rounded-full w-12 mr-2" alt="">
                    <div class="w-full overflow-hidden">
                        <div class="flex">
                            <p class="flex-grow mb-1">${data.username}</p>
                            <small class="font-light text-gray-500">09:55 am</small>
                        </div>
                        <small
                            class="overflow-ellipsis overflow-hidden whitespace-nowrap block font-light text-gray-500">${data.message}</small>
                    </div>
                </div>`;
  usersUI.innerHTML += html;
}

function AddRoomUI(data) {
  const html = `<div class="self-center text-center mr-4 hover:bg-gray-100" name="room" id="${data.name}" data-room="${data.name}">
                  <div class="relative w-12 mb-2">
                      <img src="./images/open-door.png" class="rounded-full" alt="">
                      <div
                          class="absolute bg-green-300 p-1 rounded-full bottom-0 right-0 border-gray-800 border-2">
                      </div>
                  </div>
                  <small class="font-light">${data.name}</small>
                </div>`;
  roomsUI.innerHTML += html;
}

export const AddMsgServerUI = (data) => {
  let colorMsg = "";
  if (data.status == "join") {
    colorMsg = "bg-green-100";
  } else if (data.status == "left") {
    colorMsg = "bg-red-100";
  } else {
    colorMsg = "bg-gray-200";
  }
  const html = `<div class="self-center width-full text-center mb-4 ${colorMsg}">
                    <p class="self-center text-gray-600 font-light px-6 py-2">${data.message}</p>
                </div>`;
  messagesUI.innerHTML += html;
  updateScroll();
};

export const updateUsername = (data) => {
  myUsername.innerHTML = msg.username = data;
};

export const updateRoomname = (data) => {
  roomName.innerHTML = "Sala: " + data;
};
updateRoomname(msg.room);

function updateUsersCount(data) {
  titleUsers.innerHTML = "Usuarios (" + data + "):";
}

function serverMessagePresentation() {
  AddMsgServerUI({
    status: "",
    message: `Bienvenid@ <b>${msg.username}</b> a la sala <b>"${msg.room}"</b>`,
  });
  AddMsgServerUI({
    status: "",
    message: "<b>Por tu seguridad no compartas información privada o financiera.</b>",
  });
}

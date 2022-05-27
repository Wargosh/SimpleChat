import Chat from "./models/Chat";
import {
  getRooms,
  getUsersFromRoom,
  addUserToRoom,
  removeUserFromTheRoom,
} from "./rooms";
import shortid from "shortid";

let rooms = getRooms();

export default (io) => {
  io.on("connection", (socket) => {
    const thisUserId = shortid.generate();
    const thisSocketUsername = "User_" + thisUserId;
    let user = {
      id: thisUserId,
      username: thisSocketUsername,
      room: "GENERAL", // current room
      img_username: "user.png", // img default
      message: "", // current message
    };

    socket.emit("infoConnection", thisSocketUsername);
    socket.emit("room:loadrooms", rooms);

    socket.on("disconnect", () => {
      leaveRoom(user);
      // io.to(user.room).emit("room:loadusers", users);
      updateTotalUsersInTheRoom();
    });

    const updateTotalUsersInTheRoom = () => {
      io.to(user.room).emit("room:loadusers", getUsersFromRoom(user.room));
    };

    // JOIN TO ROOM
    const joinToRoom = () => {
      addUserToRoom(user);
      socket.join(user.room);
      socket.to(user.room).emit("room:msgserver", {
        status: "join",
        message: user.username + " se ha unido a la sala.",
      });
      updateTotalUsersInTheRoom();
      console.log("<" + user.username + "> has JOIN the room: " + user.room);
    };
    joinToRoom();

    // LEAVE TO THE CURRENT ROOM
    const leaveRoom = (data) => {
      if (data.room != "") {
        socket.to(data.room).emit("room:msgserver", {
          status: "left",
          message: data.username + " ha salido de la sala.",
        });
        socket.leave(data.room);
        console.log("<" + data.username + "> has LEFT the room: " + data.room);
      }
      // users = users.filter((item) => item.id !== data.id);
      removeUserFromTheRoom(data);
      updateTotalUsersInTheRoom();
    };

    const emitChats = async () => {
      const chats = await Chat.find({ room: user.room });
      // console.log(chats);
      socket.emit("chat:loadmessages", chats);
    };
    emitChats();

    socket.on("room:changeroom", (data) => {
      leaveRoom(user);
      user.room = data;
      joinToRoom();
      emitChats();
      updateTotalUsersInTheRoom();
      console.log(rooms);
    });

    socket.on("chat:globalmessage", async (msg) => {
      const newChat = new Chat({
        username: msg.username,
        img_username: msg.img_username,
        message: msg.message,
        room: msg.room,
      });
      const savedChat = await newChat.save();
      console.log(savedChat);
      // respuesta a los demas sockets (excepto al socket actual)
      socket.to(user.room).emit("chat:globalmessage", msg);
    });
  });
};

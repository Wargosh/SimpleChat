let rooms = [
  { id: "GENERAL", name: "GENERAL", users: [] },
  { id: "HTML", name: "HTML", users: [] },
  { id: "Javascript", name: "Javascript", users: [] },
];

export const getRooms = (currentRooms) => {
  currentRooms = [];
  currentRooms = rooms;
  return currentRooms;
};

export const getUsersFromRoom = (room) => {
  let usrs = [];
  rooms.forEach((r) => {
    if (r.id === room) {
      usrs = r.users;
    }
  });
  return usrs;
};

export const addUserToRoom = (data) => {
  rooms.forEach((r) => {
    if (r.id === data.room) {
      r.users.push(data);
    }
  });
};

export const removeUserFromTheRoom = (data) => {
  rooms.forEach((r) => {
    if (r.id === data.room) {
      r.users = r.users.filter((item) => item.id !== data.id);
    }
  });
};

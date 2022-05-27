// const mongoose = require('mongoose');
import { Schema, model } from "mongoose";
// const { Schema } = mongoose;

const ChatSchema = new Schema({
  message: { type: String, required: true }, // contendo del mensaje
  // type: { type: String, required: false }, // privado, global, etc...
  // readed: { type: Boolean, required: false }, // estado de lectura de msj
  username: { type: String, required: true }, // propietario del mensaje
  img_username: { type: String, required: true }, // (Imagen) propietario del mensaje
  // user_re: { type: String, required: false }, // quien recibe el mensaje (dejar vacio si es de tipo global)
  room: { type: String, required: false }, // Con esta cadena es posible obtener el chat privado
}, {
    timestamps: true,
});

// module.exports = mongoose.model("Chat", ChatSchema);
export default model('Chat', ChatSchema);
// const mongoose = require("mongoose");
import { connect } from "mongoose";
import { MONGODB_URI } from "./config";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI, {
      //useCreateIndex: true,
      useNewUrlParser: true,
      //useFindAndModify: false,
      useUnifiedTopology: true,
    })
      .then((db) => console.log("DB is connected!"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
};

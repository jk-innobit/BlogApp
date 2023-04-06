import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;

export function connectToDb() {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`connected to Database`))
    .catch((error) => console.log(`Did not connect due to Error : ${error}`));
}

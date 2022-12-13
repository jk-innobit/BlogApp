import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("./.env");
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

export function connect(app) {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server Running on Port: http://localhost:${PORT}`)
      )
    )
    .catch((error) => console.log(`${error} did not connect`));
}

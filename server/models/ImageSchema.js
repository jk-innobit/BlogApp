import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  id: String,
  image: String,
});

var Imager = mongoose.model("Imager", imageSchema);

export default Imager;

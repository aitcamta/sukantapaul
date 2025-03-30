import mongoose from "mongoose";

let photoSchema = new mongoose.Schema({
  date: Number,
  id: String,
  fileName: String,
  fileType: String,
  addedBy: String,
  url: String,
  description: String,
  title: String,
});

const Photos =
  mongoose.models.photos || mongoose.model("photos", photoSchema, "photos");

export default Photos;

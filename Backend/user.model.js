import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  minor: {
    type: Boolean,
  },
  email: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);

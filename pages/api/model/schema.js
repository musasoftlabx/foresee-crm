// Import libraries
import _ from "lodash";
import { isEmail } from "validator";

// Import mongoose & schema from connector
import { mongoose, schema } from "./connection";
//const AutoIncrement = require("mongoose-sequence")(mongoose);

// Schema definitions
// This references the collection name as called in the DB

// User schema
const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: [true, "First name must be provided."],
      maxLength: [20, "First name cannot be more than 20 characters."],
      trim: true,
      set: (v) => _.capitalize(v),
    },
    lastName: {
      type: String,
      required: [true, "Last name must be provided."],
      maxLength: [20, "Last name cannot be more than 20 characters."],
      trim: true,
      set: (v) => _.capitalize(v),
    },
    emailAddress: {
      type: String,
      required: [true, "An email must be provided."],
      //unique: true,
      lowercase: true,
      validate: [isEmail, "The email provided is not valid."],
    },
    username: {
      type: String,
      required: [true, "A username must be provided."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be greater than 7 characters."],
    },
    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export module to app.js

mongoose.models = {};
let usersCollection = mongoose.model("user", userSchema);

export { usersCollection };

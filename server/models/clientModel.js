const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Please add a nom"],
      trim: true,
    },
  },
  {
    prenom: {
      type: String,
      required: [true, "Please add a prenom"],
      trim: true,
    },
  },
  {
    email: {
      type: String,
      required: [true, "Please add a nom"],
      trim: true,
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;

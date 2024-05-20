const mongoose = require("mongoose");

const Client = {
  nom: "",
  prenom: "",
  email: "",
};

const categorySchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Please add a date"],
      trim: true,
    },
  },
  {
    client: {
      type: typeof Client,
      required: [true, "Please add a client"],
    },
  },
  {
    products: {
      type: Object,
      required: [true, "please add a product to command"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

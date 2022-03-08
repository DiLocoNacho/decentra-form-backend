const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    config: {
      type: Object,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const myDB = mongoose.connection.useDb("DecaForm");
const Forms = myDB.model("Forms", formSchema);

module.exports = Forms;

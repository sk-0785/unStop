const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    seatNo: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    coachId: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Seats",
  }
);

const SeatsModel = mongoose.model("Seats", schema);

module.exports = {
  SeatsModel,
};

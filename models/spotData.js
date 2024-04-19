const mongoose = require("mongoose");

const spotdataSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    floor: {
      type: Number,
      required: true,
    },
    camera_id: {
      type: String,
      required: true,
    },
    parking_spaces: [
      {
        id: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["free", "pending", "occupied"],
          required: true,
        },
      },
    ],
  },
  { collection: "spotDATA" }
);

const SpotData = mongoose.model("Data", spotdataSchema);

module.exports = SpotData;

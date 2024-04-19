const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
require('dotenv').config();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Server is running on port 8000 pl");
});

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });


const SpotData = require("./models/spotdata");

const GetData = async (req, res) => {
  try {
    const data = await SpotData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




app.get("/data", GetData);

app.post("/data", async (req, res) => {
  try {
    const { floor, camera_id, parking_spaces } = req.body;
    const newSpotData = new SpotData({ floor, camera_id, parking_spaces });
    await newSpotData.save();
    console.log("DATA HAS BEEN SAVED SUCCEFULLY ");
  } catch (error) {
    console.log("Error during saving new spot DATA:", error); // Debugging statement
    res.status(500).json({ message: "Saving Failed" });
  }
});
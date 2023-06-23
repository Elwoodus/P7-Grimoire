const express = require("express");
const cors = require("cors");
const app = express();
require("./../db/mongo");



app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));



module.exports = { app };

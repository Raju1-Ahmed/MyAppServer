const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require('./routes/fileupload.route');
const fileDownload = require('./routes/fileupload.route');



//middleware
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use('/api/v1/fileUpload', fileUpload)
app.use('/api/v1/file', fileDownload);


module.exports = app;

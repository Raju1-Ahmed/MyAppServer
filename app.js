const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require('./routes/fileupload.route');
const fileDownload = require('./routes/fileupload.route');
const products = require('./routes/fileupload.route');

const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
  const { email, subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: `robiussaniraju@gmail.com` ,
        to: `${email}`,
        subject: `${subject}`,
        html: `<p>${message}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          console.log(body);
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use('/api/v1/file', products)
app.use('/api/v1/fileUpload', fileUpload)
app.use('/api/v1/file', fileDownload);


module.exports = app;

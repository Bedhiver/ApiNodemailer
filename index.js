"use strict";
const express = require("express");
const cors = require("cors");
const sendMail = require("./mail");
const router = express.Router();
const PORT = 8080;

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extend: false,
  })
);
app.use(express.json());

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Data : ", req.body);

  sendMail(name, email, subject, message, function (err, data) {
    if (err) {
      res.status(500).json({ message: "Internal error" });
    } else {
      res.status({ message: "Email sent" });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server starting on PORT, ", 8080);
});

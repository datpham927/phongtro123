const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const connectDatabase = require("./config/connectDatabase");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({ extended: true ,limit:"10mb"}));

routes(app);
connectDatabase();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Connected successfully"));

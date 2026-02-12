require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./src/routes");
const { logger } = require("./src/middlewares/logEvents");
const errorHandler = require("./src/middlewares/errorHandler");

connectDB();

const app = express();
app.use(logger);
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

module.exports = app;
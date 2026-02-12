require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./src/routes");
const { logger } = require("./src/middlewares/logEvents");
const errorHandler = require("./src/middlewares/errorHandler");
const helmet = require("helmet");

connectDB();

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(logger);
app.use(cors({
    origin: [
        "https://aller-note-2-0.vercel.app",
        "http://localhost:3000"
    ],
    credentials: true
}));
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

module.exports = app;
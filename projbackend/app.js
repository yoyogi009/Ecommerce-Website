require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

//DB Connections
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes) // this route get prefix to all the routes so always use /api before your route


const port = process.env.port||8000;
//Startign a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);// using backtick
})
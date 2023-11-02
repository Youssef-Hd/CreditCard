const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const creditCardRoutes = require('./routes/creditCardRoutes')

//specifying our port number
port = 5002;

//middlewares
//building our express app
app.use(express());
//handling JSON data
app.use(express.json());
//using cors to establish a connection between the frontend and thebackend
app.use(cors());
//a tool to make debugging easier
app.use(morgan("common"));

//Routes
//specifying our routes for different requests
app.use("/api/getCards", creditCardRoutes);
app.use("/api/postCard", creditCardRoutes);


//listening to our port to make sure everything is runing smoothly
app.listen(port, () => console.log(`API IS RUNNING ON PORT: ${port}`));

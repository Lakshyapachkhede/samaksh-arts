const express = require('express');
const cors = require('cors');
require('dotenv').config();
const paintingRouter = require("./routes/painting.router");
const authRouter = require("./routes/auth.router");
const {connectMongoDb} = require('./config/mongoConnection.config');


const app = express()


app.use(cors());

app.use(express.json());
const PORT = process.env.PORT;



app.use("/api/v1/paintings/", paintingRouter);
app.use("/auth", authRouter);


connectMongoDb(process.env.DB_CONNECTION_STRING).then(()=>console.log("mongodb connected"));

app.listen(PORT, () => {
    console.log(`Listning at ${PORT}`)
})

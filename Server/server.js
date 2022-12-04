const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {db} = require("./data/tasks")

const app = express();

app.use(cors());
dotenv.config();

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {db} = require("./data/tasks")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

// get all the tasks
app.get("/", (req,res) => {
    db("tasks")
    .select(name,description)
    .then(result => result.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// add a task
app.post("/", (req,res) => {
    const {name,description} = req.body;
    db("tasks")
    .insert({
        name,
        description
    })
    .then(result => result.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// update a task
app.put("/", (req,res) => {
    const {name,description} = req.body;
    db("tasks")
    .update({
        name,
        description
    })
    .then(result => result.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// delete a task
app.delete("/", (req,res) => {
    const {name,description} = req.body;
    db("tasks")
    .where({
        name,
        description
    })
    .del()
    .then(result => result.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {db} = require("./data/tasks.js")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

// get all the todos
app.get("/todo", (req,res) => {
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "todo")
    .then(rows => res.json(rows))
    .catch(err => {
        console.log(err);
        res.status(404).json({msg: err.message});
    })
})

// get all the doings
app.get("/doing", (req,res) => {
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "doing")
    .then(rows => res.json(rows))
    .catch(err => {
        console.log(err);
        res.status(404).json({msg: err.message});
    })
})

// get all the dones
app.get("/done", (req,res) => {
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "done")
    .then(rows => res.json(rows))
    .catch(err => {
        console.log(err);
        res.status(404).json({msg: err.message});
    })
})

// add a task
app.post("/", (req,res) => {
    const {name,description,status} = req.body;
    db("tasks")
    .insert({
        name,
        description,
        status
    })
    .then(rows => {
        selectAll(status)
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// update a task
app.put("/", (req,res) => {
    const {task_id,dataName,dataDescription,dataStatus} = req.body;
    db("tasks")
    .where("task_id", task_id)
    .update({
        name: dataName,
        description: dataDescription,
        status: dataStatus
    })
    .then(rows => {
        return db("tasks")
        .select("task_id","name", "description", "status")
        .orderBy("task_id", "asc")
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// delete a task
app.delete("/", (req,res) => {
    const {task_id,status} = req.body;
    db("tasks")
    .where("task_id", task_id)
    .del()
    .then(rows => {
        selectAll(status)
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

function selectAll(status) {
    return db("tasks")
    .select("task_id","name", "description", "status")
    .where("status", status)
    .orderBy("task_id", "asc")
}
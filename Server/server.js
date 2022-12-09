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

// ------- Boards ------- //

// get boards
app.get("/boards", (req,res) => {
    db("boards")
    .select("board_id","board_name")
    .then(rows => res.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// add a board
app.post("/boards", (req,res) => {
    const {boardName} = req.body;
    db("boards")
    .insert({
        board_name: boardName
    })
    .then(rows => {
        db("boards")
        .select("board_id","board_name")
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// delete board 
app.delete("/boards", (req,res) => {
    const {boardId} = req.body;
    db("tasks")
    .where("board_id", boardId)
    .del()
    .then(rows => {
        db("tasks")
        .select("board_id","board_name")
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// ------- Tasks ------- //

// get all the todos
app.get("/todo/:id", (req,res) => {
    const {id} = req.params;
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "todo")
    .andWhere("board_id", id)
    .innerJoin("boards","boards.board_id", "tasks.fk_board_id")
    .then(rows => res.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// get all the doings
app.get("/doing/:id", (req,res) => {
    const {id} = req.params;
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "doing")
    .andWhere("board_id", id)
    .innerJoin("boards","boards.board_id","tasks.fk_board_id")
    .then(rows => res.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// get all the dones
app.get("/done/:id", (req,res) => {
    const {boardId} = req.body;
    const {id} = req.params;
    db("tasks")
    .select("task_id","name","description","status")
    .where("status", "done")
    .andWhere("board_id", id)
    .innerJoin("boards","boards.board_id", "tasks.fk_board_id")
    .then(rows => res.json(rows))
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})

// add a task
app.post("/", (req,res) => {
    const {name,description,status,boardId} = req.body;
    db("tasks")
    .insert({
        name,
        description,
        status,
        fk_board_id: boardId
    })
    .then(rows => {
        db("tasks")
        .select("tasks.task_id","tasks.name","tasks.description","tasks.status","boards.board_id", "boards.board_name", "tasks.fk_board_id")
        .innerJoin("boards","boards.board_id", "tasks.fk_board_id")
        .where("tasks.status", status)
        .andWhere("boards.board_id", boardId)
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
    const {task_id,dataName,dataDescription,dataStatus,boardId} = req.body;
    db("tasks")
    .where("task_id", task_id)
    .update({
        name: dataName,
        description: dataDescription,
        status: dataStatus
    })
    .then(rows => {
        db("tasks")
        .select("tasks.task_id","tasks.name","tasks.description","tasks.status","boards.board_id","boards.board_name","tasks.fk_board_id")
        .andWhere("boards.board_id", boardId)
        .innerJoin("boards","boards.board_id", "tasks.fk_board_id")
        .orderBy("tasks.task_id", "asc")
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
    const {task_id,status,boardId} = req.body;
    db("tasks")
    .where("task_id", task_id)
    .del()
    .then(rows => {
        db("tasks")
        .select("tasks.task_id","tasks.name","tasks.description","tasks.status","boards.board_id","boards.board_name","tasks.fk_board_id")
        .where("tasks.status", status)
        .andWhere("boards.board_id", boardId)
        .innerJoin("boards","boards.board_id", "tasks.fk_board_id")
        .orderBy("tasks.task_id", "asc")
        .then(rows => res.json(rows))
        .catch(err => {
        res.status(404).json({msg: err.message});
        })
    })
    .catch(err => {
        res.status(404).json({msg: err.message});
    })
})


import React from 'react';
import BoardLayout from './components/BoardLayout';
import Boards from './components/Boards';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        todo: [],
        doing: [],
        done: [],
        boards: [],
        name: "",
        description: "",
        status: "",
        boardName: "",
        boardId: "-1"
    }
}

  // ------- Tasks and Boards ------- //

  // get all the tasks and boards
  componentDidMount() {
    this.getTasksAndBoards();
  }

  getTasksAndBoards = () => {
    const {boardId} = this.state;
    Promise.all([fetch("http://localhost:8000/boards"), fetch(`http://localhost:8000/todo/${boardId}`), fetch(`http://localhost:8000/doing/${boardId}`), fetch(`http://localhost:8000/done/${boardId}`)])
    .then(([result1, result2, result3, result4]) => {
      return Promise.all([result1.json(), result2.json(), result3.json(), result4.json()])
    })
    .then(([data1, data2, data3, data4]) => {
      this.setState({boards: data1, todo: data2, doing: data3, done: data4})
    })
    .catch(err => console.log(err))
  }

  // ------- Tasks ------- //

  // add a task
  addTask = (event) => {
      event.preventDefault();
      const {name,description,status,boardId} = this.state;
      if (boardId.length === 0 || boardId === "-1") {
        alert("Please pick a board");
        return;
      }
      if (status === "chooseStatus" || status === "") {
        alert("Task wasn't added, please fill out everything");
      } else {
        fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                status,
                boardId
            })
        })
        .then(result => result.json())
        .then(data => {
          this.setState({[status]: data})
        })
        .catch(err => console.log(err));
      }

      this.setState({
        name: "",
        description: "",
        status: ""
      })
  }

  // set task 
  setTask = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

  // update task
  updateTask = (element,event) => {
    event.preventDefault();
    const {name,description,status,boardId} = this.state;
    const dataName = name.length === 0 ? element.name : name;
    const dataDescription = description.length === 0 ? element.description : description;
    const dataStatus = status.length === 0 || status === "chooseStatus" ? element.status : status;
    fetch("http://localhost:8000", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task_id: element.task_id,
          dataName,
          dataDescription,
          dataStatus,
          boardId
        })
    })
    .then(result => result.json())
    .then(data => {
      const filterToDo = data.filter(element => {
        return element.status === "todo";
      })
      const filterDoing = data.filter(element => {
        return element.status === "doing";
      })
      const filterDone = data.filter(element => {
        return element.status === "done";
      })
      this.setState({
        todo: filterToDo, 
        doing: filterDoing, 
        done: filterDone
      });
    })
    .catch(err => console.log(err));

    this.setState({
      name: "",
      description: "",
      status: ""
    })
  }

  // delete task
  deleteTask = (element) => {
    const key = element.status;
    const {boardId} = this.state;
      fetch("http://localhost:8000", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            task_id: element.task_id,
            name: element.name,
            description: element.description,
            status: element.status,
            boardId
          })
      })
      .then(result => result.json())
      .then(data => {
        this.setState({[key]: data})
      })
      .catch(err => console.log(err))
  }

  // ------- Boards ------- //

  // add board
  addBoard = (event) => {
    event.preventDefault();
    const {boardName} = this.state;
    if (boardName.length === 0) {
      alert("Board wasn't added, please try again");
    } else {
      fetch("http://localhost:8000/boards", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              boardName
          })
      })
      .then(result => result.json())
      .then(data => {
        this.setState({boards: data})
      })
      .catch(err => console.log(err));
    }

    this.setState({
      boardName: ""
    })
  }

  render() {
    const {todo,doing,done,boards} = this.state;
    return (
      <div>
        <section className="pickAndAdd">
        <Boards getTasksAndBoards={this.getTasksAndBoards} setTask={this.setTask} addBoard={this.addBoard} boards={boards}/>
        </section>
        <section className="layouts">
          <BoardLayout status={todo} title="To Do" addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
          <BoardLayout status={doing} title="Doing" addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
          <BoardLayout status={done} title="Done"  addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
        </section>
      </div>
    );
  }
}

export default App;

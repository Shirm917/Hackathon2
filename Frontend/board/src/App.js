import BoardLayout from './components/BoardLayout';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        todo: [],
        doing: [],
        done: [],
        name: "",
        description: "",
        status: ""
    }
}

// get all the tasks
componentDidMount() {
    Promise.all([fetch("http://localhost:8000/todo"), fetch("http://localhost:8000/doing"), fetch("http://localhost:8000/done")])
    .then(([result1, result2, result3]) => {
        return Promise.all([result1.json(), result2.json(), result3.json()])
    })
    .then(([data1, data2, data3]) => {
        return this.setState({todo: data1, doing: data2, done: data3})
    })
    .catch(err => console.log(err))
}

// add a task
addTask = (event) => {
    event.preventDefault();
    const {name,description,status} = this.state;
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
              status
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
  const {name,description,status} = this.state;
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
        dataStatus
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
    fetch("http://localhost:8000", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task_id: element.task_id,
            name: element.name,
            description: element.description,
            status: element.status
        })
    })
    .then(result => result.json())
    .then(data => {
      this.setState({[key]: data})
    })
    .catch(err => console.log(err))
}

  render() {
    const {todo,doing,done} = this.state;
    return (
      (todo.length === 0 && doing.length === 0 && done.length === 0) ? <h1 className="loading">Loading...</h1> :
      <section>
        <BoardLayout status={todo} title="To Do" addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
        <BoardLayout status={doing} title="Doing" addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
        <BoardLayout status={done} title="Done"  addTask={this.addTask} setTask={this.setTask} updateTask={this.updateTask} deleteTask={this.deleteTask}/>
      </section>
    );
  }
}

export default App;

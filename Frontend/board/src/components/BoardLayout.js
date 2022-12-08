import '../BoardLayout.css';
import Card from 'react-bootstrap/Card';
import { BsFillTrashFill } from "react-icons/bs";
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';

const BoardLayout = (props) => {
    const {data,addTask,setTask,updateTask,deleteTask} = props;
    return (
        <div>
            <section>
                <div className="todo">
                    <h1>To Do</h1>
                    {
                        data.todo.map((task,index) => {
                            return (
                                <Card body key={task.task_id}>
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <p>{task.status}</p>
                                    <button onClick={() => deleteTask(task,index)}><BsFillTrashFill /></button>
                                    <UpdateTask updateTask={updateTask} setTask={setTask} task={task} />
                                </Card>
                            )
                        })
                    }
                    <AddTask  addTask={addTask} setTask={setTask}/>
                </div>
                {/* doing */}
                <div className="doing">
                    <h1>Doing</h1>
                    {
                        data.doing.map(task => {
                            return (
                                <Card body key={task.task_id}>
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <p>{task.status}</p>
                                    <button onClick={() => deleteTask(task)}><BsFillTrashFill /></button>
                                    <UpdateTask updateTask={updateTask} setTask={setTask} task={task}/>
                                </Card>
                            )
                        })
                    }
                    <AddTask  addTask={addTask} setTask={setTask}/>
                </div>
                {/* done */}
                <div className="done">
                    <h1>Done</h1>
                    {
                        data.done.map(task => {
                            return (
                                <Card body key={task.task_id}>
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <p>{task.status}</p>
                                    <button onClick={() => deleteTask(task)}><BsFillTrashFill /></button>
                                    <UpdateTask updateTask={updateTask} setTask={setTask} task={task}/>
                                </Card>
                            )
                        })
                    }
                    <AddTask  addTask={addTask} setTask={setTask}/>
                </div>
            </section>
        </div>
    )
}

export default BoardLayout;
import '../BoardLayout.css';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
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
                        data.todo.map(task=> {
                            return (
                                <div className="container" key={task.task_id} >
                                    <Accordion>
                                        <Accordion.Item eventKey="0" className="accItem">
                                            <Accordion.Header>
                                                <Button className="delete" variant="transparent" onClick={(element) => deleteTask(task)}><BsFillTrashFill /></Button>
                                                <UpdateTask updateTask={updateTask} setTask={setTask} task={task} />
                                                <p className="name">{task.name}</p>
                                            </Accordion.Header>
                                            <Accordion.Body>Description: {task.description}</Accordion.Body>
                                            {/* <p>{task.status}</p> */}
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
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
                                <div className="container" key={task.task_id}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0" className="accItem">
                                            <Accordion.Header>
                                                <Button className="delete" variant="transparent" onClick={(element) => deleteTask(task)}><BsFillTrashFill /></Button>
                                                <UpdateTask updateTask={updateTask} setTask={setTask} task={task} />
                                                <p className="name">{task.name}</p>
                                            </Accordion.Header>
                                            <Accordion.Body>Description: {task.description}</Accordion.Body>
                                            {/* <p>{task.status}</p> */}
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
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
                                <div className="container" key={task.task_id} >
                                    <Accordion>
                                        <Accordion.Item eventKey="0" className="accItem">
                                            <Accordion.Header>
                                                <Button className="delete" variant="transparent" onClick={(element) => deleteTask(task)}><BsFillTrashFill /></Button>
                                                <UpdateTask updateTask={updateTask} setTask={setTask} task={task} />
                                                <p className="name">{task.name}</p>
                                            </Accordion.Header>
                                            <Accordion.Body>Description: {task.description}</Accordion.Body>
                                            {/* <p>{task.status}</p> */}
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
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
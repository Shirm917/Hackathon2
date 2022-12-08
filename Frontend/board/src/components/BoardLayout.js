import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { BsFillTrashFill } from "react-icons/bs";
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import '../BoardLayout.css';

const BoardLayout = (props) => {
    const {status,title,addTask,setTask,updateTask,deleteTask} = props;
    return (
        <div className="columns">
            <h1>{title}</h1>
            {
                status.map(task => {
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
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    )
                })
            }
            <AddTask  addTask={addTask} setTask={setTask}/>
        </div>
    )
}

export default BoardLayout;
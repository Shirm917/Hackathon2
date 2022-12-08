import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BsPencilSquare } from "react-icons/bs";

function UpdateTask(props) {
  const {setTask,updateTask,task} = props;  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="update" variant="transparent" onClick={handleShow}>
        <BsPencilSquare size={15}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => updateTask(task,event)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" autoFocus name="name" defaultValue={task.name} onChange={setTask}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" autoFocus name="description" defaultValue={task.description} onChange={setTask}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select name="status" onChange={setTask} >
                    <option value="chooseStatus">Choose Status:</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateTask;
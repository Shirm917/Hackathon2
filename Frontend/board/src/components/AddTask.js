import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddTask(props) {
  const {setTask,addTask} = props;  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="transparent" onClick={handleShow}>
        + Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addTask}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" autoFocus name="name" onChange={setTask} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" autoFocus name="description" onChange={setTask} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select name="status" onChange={setTask} >
                    <option value="chooseStatus">Choose Status:</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddTask;
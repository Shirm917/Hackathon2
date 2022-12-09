import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Boards = (props) => {
    const {getTasksAndBoards,setTask,addBoard,boards} = props;  
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getAndSet(event) {
        await setTask(event);
        getTasksAndBoards();
    }

    return (
        <>
            <select name="boardId" className="pick" onChange={getAndSet}>
                <option value="-1">Pick a board</option>
                    {
                        boards.map(board => {
                            return (
                                <option key={board.board_id} value={board.board_id}>{board.board_name}</option>
                            )
                        })
                    }
            </select>

            <Button variant="transparent" onClick={handleShow}>
                + Add Board
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={addBoard}>
                    <Form.Group className="mb-3">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control type="text" autoFocus name="boardName" onChange={setTask} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleClose}>Add</Button>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Boards;
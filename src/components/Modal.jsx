import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function EditModal({ show, handleClose, onSave }) {
    const [note, setNote] = useState("");

    const saveNote = () => {
        onSave(note);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Edit Note</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control value={note} onChange={(e) => setNote(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={saveNote}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

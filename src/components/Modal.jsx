// FILE: src/components/Modal.jsx

import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function EditModal({ show, handleClose, onSave }) {
    // Local state to store the editable note text
    const [note, setNote] = useState("");

    // Save the updated note and close the modal
    const saveNote = () => {
        onSave(note);     // Send updated note back to parent
        handleClose();    // Close modal after saving
    };

    return (
        // Bootstrap modal that appears when "show" is true
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>

            {/* Input field for editing note text */}
            <Modal.Body>
                <Form.Control
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </Modal.Body>

            {/* Modal action buttons */}
            <Modal.Footer>
                {/* Close modal without saving */}
                <Button variant="secondary" onClick={handleClose}>Close</Button>

                {/* Save the note */}
                <Button variant="primary" onClick={saveNote}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginModal = (props) => {
  const [name, setName] = useState(''); // State for the name field

  const handleSubmit = () => {
    // Call the onSubmit prop with the necessary data
    if (props.onSubmit) {
      props.onSubmit(name);
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name input"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
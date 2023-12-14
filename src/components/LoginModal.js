import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginModal = ({ externalError, setExternalError, ...props }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        props.onSubmit(userCredential.user.email, password);
        setLoading(false);
        props.onHide()
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
          <div type="button" className="close-button" onClick={props.onHide}>
            &times; {/* This is a common symbol used for close buttons */}
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* Use externalError to display error passed from parent */}
          {externalError && <Alert variant="danger">{externalError}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ fontWeight: "bold" }} variant="primary" type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LoginModal;

import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = () => {
        const errors = {};
        if (!validateEmail(email)) {
            errors.email = 'Invalid email address';
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // Redirect or update UI
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '70%' }}>
                    <div style={{ width: '70%', position: 'relative' }}>
                        <h5 style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                            <Link to="/"><FontAwesomeIcon icon={faBackward} /> Back</Link>
                        </h5>
                    </div>
                    <Row className="no-gutters">
                        <Col md={6}>
                            <Card.Img src="./images/banner.jpg" alt="Sign Up" style={{ objectFit: 'cover', height: '100%' }} />
                        </Col>
                        <Col md={6}>
                            <Card.Body style={{ alignContent: 'center' }}>
                                <h2 className="mb-4">Sign Up</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    {/* Email field */}
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!validationErrors.email} />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Password field */}
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!validationErrors.password} />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Confirm Password field */}
                                    <Form.Group controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={!!validationErrors.confirmPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <br />

                                    <Button variant="primary" type="submit" className='primary button'>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Container>
    );
};

export default SignUp;

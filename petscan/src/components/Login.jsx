import { Link } from 'react-router-dom';
import dogImage from '../assets/images/cat-dog.png';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        const model = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(model),
            });

            if (!response.ok) {
                throw new Error('Login fallito');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('firstName', data.firstName);
            navigate('/options');

        } catch (error) {
            console.error('Errore nel login: ', error);
            setErrorMessage('Credenziali errate');
        }
    };

    return (
        <>
            <div className="login-container">
                <Row className="h-100">
                    <Col md={3} lg={5} className="d-flex align-items-center justify-content-center blue-background">
                    </Col>
                    <Col md={9} lg={7} className="d-flex justify-content-center white-background">
                        <div className="d-flex flex-column align-items-center">
                            <h1 className="login-title">
                                Login
                                <span className="underline"></span>
                            </h1>

                            <div className="w-100 mt-5">
                                <InputGroup hasValidation className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        required
                                        className="custom-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>

                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="custom-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>

                                {errorMessage && (
                                    <p className="error-message">
                                        <span role="img" aria-label="warning">❗️</span> {errorMessage}
                                    </p>
                                )}
                            </div>
                            <Button className='button-login mt-5 rounded-pill px-4' onClick={handleLogin}>Login</Button>
                            <div className='mt-5'>
                                Non sei ancora registrato? <Link to="/auth/register" className='signup-link'>Registrati qui</Link>
                            </div>
                            <img src={dogImage} alt="puppies" className='dog-picture' />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Login;
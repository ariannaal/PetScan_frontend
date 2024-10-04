import { Link, useNavigate } from 'react-router-dom';
import dogImage from '../assets/images/cat-dog.png';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
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
                                    />
                                </InputGroup>

                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="custom-input"
                                    />
                                </InputGroup>
                            </div>
                            <Button className='button-login mt-5 rounded-pill px-4' onClick={handleLogin}>Login</Button>
                            <div className='mt-5'>Non sei ancora registrato? <Link to="/auth/register" className='signup-link'>Registrati qui</Link></div>
                            <img src={dogImage} alt="puppies" className='dog-picture' />
                        </div>


                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Login;
import { Button, Col, Form, InputGroup, Row, Dropdown, DropdownButton } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {

    // const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {

        const model = {
            name,
            surname,
            gender,
            dateOfBirth: birthDate,
            email,
            password,
        }

        console.log(model);

        try {
            const response = await fetch('http://localhost:3001/auth/register', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(model),

            });
            if (!response.ok) {
                throw new Error('Registrazione fallita');
            }
            const data = await response.json();
            console.log('Registazione avvenuta con successo: ', data);
        } catch (error) {
            console.error('Errore nella registrazione: ', error);
        }
    };

    const handleSelect = (selectedGender) => {
        setGender(selectedGender);
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
                                Registrati
                                <span className="underline"></span>
                            </h1>



                            <div className="w-100">

                                <Form.Group className="mb-3 mt-5">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nome"
                                        className="custom-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-4">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Cognome"
                                        className="custom-input"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                </Form.Group>

                                <DropdownButton
                                    id="gender-dropdown"
                                    title={gender || 'Genere'}
                                    onSelect={handleSelect}
                                    className="mt-4"
                                >
                                    <Dropdown.Item className='gender-dropdown' eventKey="FEMALE">Femmina</Dropdown.Item>
                                    <Dropdown.Item className='gender-dropdown' eventKey="MALE">Maschio</Dropdown.Item>
                                </DropdownButton>

                                <Form.Group className="mb-3 mt-4">
                                    Data di nascita
                                    <Form.Control
                                        required
                                        type="date"
                                        placeholder="Data di nascita"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className='mt-1 custom-date-input custom-input'

                                    />
                                </Form.Group>

                                <InputGroup hasValidation className="mb-3 mt-4">
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

                            </div>

                            <Button className='button-login mt-5 rounded-pill px-4' onClick={handleSignup}>Registrati</Button>

                        </div>

                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Signup;
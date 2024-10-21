
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pawPrints from '../assets/images/paws-prints.png';

const AccountEdit = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        dateOfBirth: '',
        gender: ''
    });
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/owners/me`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch owner data');
                }

                const data = await response.json();
                setFormData({
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender
                });
            } catch (error) {
                console.error("Error fetching owner:", error);
            }
        };

        fetchOwnerData();
    }, [accessToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/owners/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update account information');
            }

            navigate('/owners/me');
        } catch (error) {
            console.error('Error updating owner:', error);
        }
    };

    return (
        <Container className="my-5" style={{ height: '100vh' }}>
            <h1 className="text-center my-5 login-title test-title">Modifica il tuo account</h1>
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paws-account-2"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
            <Form onSubmit={handleFormSubmit} className="border p-4 rounded shadow" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Form.Group controlId="formName">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label>Cognome:</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Data di nascita:</Form.Label>
                    <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group controlId="formGender">
                    <Form.Label>Genere:</Form.Label>
                    <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="custom-input"
                    >
                        <option value="MALE">Maschio</option>
                        <option value="FEMALE">Femmina</option>
                    </Form.Control>
                </Form.Group>

                <div className="d-flex justify-content-between mt-4">
                    <Button type="submit" className='button-login mb-5 rounded-pill px-4'>Aggiorna</Button>
                    <Button
                        variant="secondary"
                        className='button-login mb-5 rounded-pill px-4'
                        onClick={() => navigate('/owners/me')}
                    >
                        Annulla
                    </Button>
                </div>
            </Form>
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paw-prints paws-about-us"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
        </Container >
    );
};

export default AccountEdit;
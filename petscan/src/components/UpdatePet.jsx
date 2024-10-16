import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';

const UpdatePet = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState({ name: '', age: '', picture: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const petName = location.state?.petName || '';
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchPet = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/pets/${petId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Errore nel recupero dell\'animale');
                }

                const petData = await response.json();
                setPet(petData);
            } catch (error) {
                console.error('Errore:', error);
                setErrorMessage('Si è verificato un errore nel recupero dell\'animale.');
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [petId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet((prevPet) => ({
            ...prevPet,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPet((prevPet) => ({
                ...prevPet,
                picture: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', pet.name);
        formData.append('age', pet.age);

        if (pet.picture) {
            formData.append('picture', pet.picture);
        }

        try {
            const response = await fetch(`http://localhost:3001/pets/${petId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Errore nel salvataggio dei dati dell\'animale');
            }

            const updatedPet = await response.json();
            console.log('Animale aggiornato:', updatedPet);
            navigate('/pets');
        } catch (error) {
            console.error('Errore:', error);
            setErrorMessage('Si è verificato un errore nel salvataggio dei dati dell\'animale.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="form-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center my-5 login-title">
                Modifica i dati di {petName} <span className="underline"></span>
            </h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {loading ? (
                <Spinner animation="border" className='spinner' />
            ) : (
                pet && (
                    <Form onSubmit={handleSubmit} className="w-50">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Nome</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                name="name"
                                value={pet.name}
                                onChange={handleChange}
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="age">Età</Form.Label>
                            <Form.Control
                                type="number"
                                id="age"
                                name="age"
                                value={pet.age}
                                onChange={handleChange}
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group controlId="picture" className="mb-3">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                name="picture"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {pet.picture && typeof pet.picture !== 'string' && (
                                <img
                                    src={URL.createObjectURL(pet.picture)}
                                    alt={pet.name}
                                    style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                    className="animal-picture"
                                />
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button type="submit" className='button-login mt-5 rounded-pill px-4'>
                                Salva
                            </Button>
                            <Button className='button-login mt-5 rounded-pill px-4' onClick={() => navigate('/pets')}>
                                Annulla
                            </Button>
                        </div>
                    </Form>
                )
            )}
        </div>
    );
};
export default UpdatePet;
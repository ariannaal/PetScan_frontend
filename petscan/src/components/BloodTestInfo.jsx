import { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import pawPrints from '../assets/images/paws-prints.png';

const BloodTestInfo = () => {

    const [dateOfTest, setDateOfTest] = useState('');
    const [petType, setPetType] = useState('');
    const [testNumber, setTestNumber] = useState('');
    const [pets, setPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        fetchPets();
    }, []);


    const fetchPets = async () => {

        try {

            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                setErrorMessage("Effettua il login o registrati per aggiungere un esame del sangue.");
                return;
            }

            const response = await fetch(`http://localhost:3001/pets`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },

            });

            if (!response.ok) {
                throw new Error('Errore nel recuperare gli animali');
            }

            const data = await response.json();
            console.log('Animali trovati:', data);
            setPets(data);


        } catch (error) {
            console.error('Errore nel trovare gli animali:', error);
            setErrorMessage('Errore nel trovare gli animali');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bloodTest = {
            dateOfTest,
            petType,
            testNumber,
            petId: selectedPetId,
        };

        try {
            const response = await fetch('http://localhost:3001/bloodTests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(bloodTest),

            });

            const data = await response.json();
            console.log("Dati dell'esame del sangue:", data);

            const bloodTestId = data.id;

            navigate(`/results?bloodTestId=${bloodTestId}`);

            if (!response.ok) {
                throw new Error('Errore nell\'inserimento del test del sangue');
            }

            console.log('Esame del sangue inserito con successo');

        } catch (error) {
            console.log(bloodTest)
            console.error('Errore durante l\'invio del test del sangue:', error);
            setErrorMessage('Errore durante l\'inserimento del test');
        }
    };

    return (
        <>
            <div className="form-container d-flex flex-column align-items-center justify-content-center div-bloodtest">

                <h1 className="text-center my-5 login-title">Registra un esame del sangue <span className="underline"></span></h1>

                <img
                    src={pawPrints}
                    alt="prints"
                    className="position-absolute  img-fluid paws-bloodtest-2"
                    style={{ width: '650px', height: 'auto', zIndex: 0 }}
                />

                <Form onSubmit={handleSubmit} className="w-25">
                    <Form.Group controlId="dateOfTest">
                        <Form.Label>Data dell&apos;esame</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateOfTest}
                            onChange={(e) => setDateOfTest(e.target.value)}
                            required
                            className="custom-input"
                        />
                    </Form.Group>

                    <Form.Group controlId="petType" className="mt-3">
                        <Form.Label>Tipo di animale</Form.Label>
                        <Form.Control
                            as="select"
                            value={petType}
                            onChange={(e) => setPetType(e.target.value)}
                            required
                            className="custom-input"
                        >
                            <option value="">Seleziona il tipo di animale</option>
                            <option value="CAT">Gatto</option>
                            <option value="DOG">Cane</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="testNumber" className="mt-3">
                        <Form.Label>Numero dell&apos;esame</Form.Label>
                        <Form.Control
                            type="number"
                            value={testNumber}
                            onChange={(e) => setTestNumber(e.target.value)}
                            required
                            className="custom-input"
                            min="0"
                        />
                    </Form.Group>

                    <Form.Group controlId="petSelect" className="mt-3">
                        <Form.Label>Seleziona l&apos;animale</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedPetId}
                            onChange={(e) => setSelectedPetId(e.target.value)}
                            required
                            className="custom-input"
                            disabled={pets.filter(pet => pet.petType === petType).length === 0} // disabilita il dropdown se non ci sono animali
                        >
                            <option value="">Seleziona un animale</option>
                            {pets
                                .filter(pet => pet.petType === petType)
                                .map(pet => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.name}
                                    </option>
                                ))
                            }
                        </Form.Control>

                        {petType && pets.filter(pet => pet.petType === petType).length === 0 && (
                            <Form.Label className="mt-2 text-danger">
                                Nessun {petType === "DOG" ? "cane" : "gatto"} trovato
                            </Form.Label>
                        )}
                    </Form.Group>

                    {errorMessage && (
                        <p className="error-message">
                            <span role="img" aria-label="warning">❗️</span> {errorMessage}
                        </p>
                    )}

                    <div className="d-flex justify-content-center">
                        <Button className='button-login mt-5 rounded-pill px-4' type="submit">
                            Invia
                        </Button>
                    </div>
                </Form>
                <img
                    src={pawPrints}
                    alt="prints"
                    className="position-absolute  img-fluid paw-prints"
                    style={{ width: '650px', height: 'auto', zIndex: 0 }}
                />
            </div>
        </>

    );
};





export default BloodTestInfo;
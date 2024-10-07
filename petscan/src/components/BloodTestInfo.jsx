import { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';

const BloodTestInfo = () => {

    const [dateOfTest, setDateOfTest] = useState('');
    const [petType, setPetType] = useState('');
    const [testNumber, setTestNumber] = useState('');
    const [pets, setPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);


    const fetchPets = async () => {

        try {

            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch(`http://localhost:3001/pets`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Errore nel recuperare gli animali');
            }

            const data = await response.json();
            console.log('Animali recuperati:', data);
            setPets(data);

        } catch (error) {
            console.error('Errore nel recuperare gli animali:', error);
            setErrorMessage('Errore nel recuperare gli animali');
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
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="dateOfTest">
                    <Form.Label>Data dell esame</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateOfTest}
                        onChange={(e) => setDateOfTest(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="petType" className="mt-3">
                    <Form.Label>Tipo di animale</Form.Label>
                    <Form.Control
                        as="select"
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        required
                    >
                        <option value="">Seleziona il tipo di animale</option>
                        <option value="CAT">Gatto</option>
                        <option value="DOG">Cane</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="testNumber" className="mt-3">
                    <Form.Label>Numero del test</Form.Label>
                    <Form.Control
                        type="number"
                        value={testNumber}
                        onChange={(e) => setTestNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="petSelect" className="mt-3">
                    <Form.Label>Seleziona l animale</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedPetId}
                        onChange={(e) => setSelectedPetId(e.target.value)}
                        required
                    >
                        <option value="">Seleziona un animale</option>
                        {pets
                            .filter(pet => pet.petType === petType || petType === '')
                            .map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                {errorMessage && (
                    <p className="error-message" style={{ color: 'red' }}>
                        {errorMessage}
                    </p>
                )}

                <Button className="mt-4" variant="primary" type="submit">
                    Invia
                </Button>
            </Form>
        </>
    );
};





export default BloodTestInfo;
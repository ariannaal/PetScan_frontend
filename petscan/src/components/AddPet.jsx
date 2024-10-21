import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pawPrints from '../assets/images/paws-prints.png';

const AddPet = () => {
    const [name, setName] = useState('');
    const [petType, setPetType] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [picture, setPicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            setErrorMessage("Effettua il login o registrati per aggiungere un nuovo animale.");
            return;
        }

        const newPet = {
            name: name,
            petType: petType,
            breed: breed,
            gender: gender,
            age: parseInt(age),
            dateOfBirth: dateOfBirth,

        };

        try {

            const response = await fetch('http://localhost:3001/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newPet),
            });

            if (!response.ok) {
                throw new Error('Errore nella registrazione del nuovo animale');
            }

            const petInfo = await response.json();
            console.log("Nuovo animale registrato:", petInfo)


            if (picture) {
                const formData = new FormData();
                formData.append('picture', picture);

                const uploadResponse = await fetch(`http://localhost:3001/pets/${petInfo.id}/picture`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Errore nel caricamento della foto');
                }
            }

            navigate('/pets');
        } catch (error) {
            console.error('Errore:', error);
            setErrorMessage('Effettua il login o registrati prima di aggiungere un animale.');
        }
    };


    return (
        <div className="form-container d-flex flex-column align-items-center justify-content-center">

            <h1 className="text-center mt-4 mb-5 login-title test-title">Registra un nuovo animale <span className="underline"></span></h1>

            <Form onSubmit={handleSubmit} className="col-lg-4 col-md-6 col-sm-12">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <Form.Group className="mb-3" controlId="formPetName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci il nome dell'animale"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPetType">
                    <Form.Label>Specie</Form.Label>
                    <Form.Select
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        required
                        className="custom-input">
                        <option value="DOG">Cane</option>
                        <option value="CAT">Gatto</option>

                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPetBreed">
                    <Form.Label>Razza</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci la razza dell'animale"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPetGender">
                    <Form.Label>Genere</Form.Label>
                    <Form.Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="custom-input">
                        <option value="MALE">Maschio</option>
                        <option value="FEMALE">Femmina</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPetAge">
                    <Form.Label>Età</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Inserisci l'età dell'animale"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPetDateOfBirth">
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Inserisci la data di nascita"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPetPicture">
                    <Form.Label>Carica una foto</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setPicture(e.target.files[0])}
                        className="custom-input"
                    />
                </Form.Group>


                <div className="d-flex justify-content-center mb-3">
                    <Button className='button-login mb-5 rounded-pill px-4' type="submit">
                        Registra animale
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
    );
};

export default AddPet;
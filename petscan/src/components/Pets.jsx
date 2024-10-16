import { useEffect, useState } from 'react';
import pawPicture from '../assets/images/paw-picture.png'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('http://localhost:3001/pets', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Errore nel recupero degli animali');
                }

                const petsData = await response.json();
                setPets(petsData);

            } catch (error) {
                console.error('Errore:', error);
                setErrorMessage('Si è verificato un errore nel recupero degli animali.');
            }
        };

        fetchPets();
    }, []);


    return (
        <div className="form-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center my-5 login-title">
                I tuoi animali <span className="underline"></span>
            </h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <ul className="list-unstyled">
                {pets.map((pet) => (
                    <li key={pet.id} className="pet-item d-flex align-items-center">
                        {pet.picture ? (
                            <img
                                src={pet.picture}
                                alt={pet.name}
                                style={{ width: '170px', height: '170px', marginRight: '15px' }}
                                className="animal-picture"
                            />
                        ) : (
                            <img
                                src={pawPicture}
                                alt="Immagine di default"
                                style={{ width: '150px', height: '150px', marginRight: '15px' }}
                                className="rounded"
                            />
                        )}
                        <div className='ms-4'>
                            <h3 className='pet-name pb-2'> {pet.name}</h3>
                            <p><strong>Specie:</strong> {pet.petType === 'CAT' ? 'Gatto' : pet.petType === 'DOG' ? 'Cane' : pet.petType}</p>
                            <p><strong>Razza:</strong> {pet.breed}</p>
                            <p><strong>Genere:</strong> {pet.gender === 'MALE' ? 'Maschio' : pet.gender === 'FEMALE' ? 'Femmina' : pet.gender}</p>
                            <p><strong>Età:</strong> {pet.age}</p>
                            <p><strong>Data di Nascita:</strong> {pet.dateOfBirth}</p><div className='d-flex align-column'>
                                <Button className='button-login mt-5 rounded-pill px-4 ms-3' onClick={() => navigate(`/bloodTests/${pet.id}`, { state: { petName: pet.name } })}>Visualizza gli esami di {pet.name}</Button>
                                <Button className='button-login mt-5 rounded-pill px-4 ms-3' onClick={() => navigate(`/pets/${pet.id}`, { state: { petName: pet.name } })}>Modifica i dati di {pet.name} </Button>
                            </div>

                        </div>

                    </li>
                ))}
            </ul>


        </div >
    );
};

export default Pets;
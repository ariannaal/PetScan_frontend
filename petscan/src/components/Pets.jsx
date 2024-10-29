import { useEffect, useState } from 'react';
import pawPicture from '../assets/images/paw-picture.png'
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            setErrorMessage("Effettua il login per visualizzare i tuoi animali.");
            setLoading(false);
            return;
        }

        const fetchPets = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/pets`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
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
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    return (
        <div className="pets-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center my-5 login-title test-title">
                I tuoi animali <span className="underline"></span>
            </h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {loading ? (
                <div className="spinner-container">
                    <Spinner animation="border" className='spinner' />
                </div>
            ) : (
                <ul className="list-unstyled pets-container">
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
                            <div className='ms-4 text-pets'>
                                <h3 className='pet-name pb-2'> {pet.name}</h3>
                                <p><strong>Specie:</strong> {pet.petType === 'CAT' ? 'Gatto' : pet.petType === 'DOG' ? 'Cane' : pet.petType}</p>
                                <p><strong>Razza:</strong> {pet.breed}</p>
                                <p><strong>Genere:</strong> {pet.gender === 'MALE' ? 'Maschio' : pet.gender === 'FEMALE' ? 'Femmina' : pet.gender}</p>
                                <p><strong>Età:</strong> {pet.age}</p>
                                <p><strong>Data di Nascita:</strong> {pet.dateOfBirth}</p>
                                <div className='d-flex align-column buttons-pets'>
                                    <Button className='button-login mt-5 rounded-pill px-4 ms-3' onClick={() => navigate(`/bloodTests/${pet.id}`, { state: { petName: pet.name } })}>Visualizza gli esami di {pet.name}</Button>
                                    <Button className='button-login mt-5 rounded-pill px-4 ms-3' onClick={() => navigate(`/pets/${pet.id}`, { state: { petName: pet.name } })}>Modifica i dati di {pet.name}</Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pets;
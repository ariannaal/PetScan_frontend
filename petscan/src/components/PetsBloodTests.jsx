import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import pawPrints from '../assets/images/paws-prints.png';

const PetsBloodTests = () => {
    const { petId } = useParams();
    const [bloodTests, setBloodTests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const navigate = useNavigate();
    const petName = state?.petName;

    useEffect(() => {
        setLoading(true);
        const fetchBloodTests = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/bloodTests/${petId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Errore nel recupero degli esami del sangue');
                }

                const bloodTestsData = await response.json();
                setBloodTests(bloodTestsData);
            } catch (error) {
                console.error('Errore:', error);
                setErrorMessage('Si è verificato un errore nel recupero degli esami del sangue.');
            } finally {
                setLoading(false);
            }
        };

        fetchBloodTests();
    }, [petId]);

    const handleTestClick = (bloodTestId) => {
        navigate(`/bloodTest/results/${bloodTestId}`, { state: { petName: petName } });
    };

    const handleNavigate = () => {
        navigate('/bloodTests');
    };

    return (
        <div className="form-container d-flex flex-column align-items-center div-exams">
            <h1 className="text-center my-5 login-title test-title">
                Esami del sangue di {petName}
            </h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paws-bloodtest-2"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />

            {loading ? (
                <div className="spinner-container">
                    <Spinner animation="border" className='spinner' />
                </div>
            ) : (
                <ul className="list-unstyled tests-list">
                    {bloodTests.length > 0 ? (
                        bloodTests.map((test) => (
                            <li key={test.id} className="pet-item d-flex align-items-space-between pt-2" onClick={() => handleTestClick(test.id)}
                                style={{ cursor: 'pointer' }}>
                                <p><strong>Numero dell&apos;esame:</strong> {test.testNumber}</p>
                                <p className="ms-4"><strong>Data dell&apos;esame:</strong> {test.dateOfTest}</p>
                            </li>
                        ))
                    ) : (
                        <p>Nessun esame del sangue trovato per {petName}.</p>
                    )}
                </ul>
            )}

            <Button className='button-login my-3 rounded-pill px-4' onClick={handleNavigate}>
                Aggiungi un esame del sangue
            </Button>

            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paw-prints"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
        </div>
    );
};

export default PetsBloodTests;
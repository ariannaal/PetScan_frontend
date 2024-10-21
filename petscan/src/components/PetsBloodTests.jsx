import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const PetsBloodTests = () => {
    const { petId } = useParams();
    const [bloodTests, setBloodTests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();

    const petName = state?.petName;

    useEffect(() => {
        const fetchBloodTests = async () => {
            try {
                const response = await fetch(`http://localhost:3001/bloodTests/${petId}`, {
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
            }
        };

        fetchBloodTests();
    }, [petId]);

    const handleTestClick = (bloodTestId) => {
        navigate(`/bloodTest/results/${bloodTestId}`, { state: { petName: petName } });

    };

    return (
        <div className="form-container d-flex flex-column align-items-center  div-exams">
            <h1 className="text-center my-5 login-title test-title">
                Esami del sangue di {petName}
            </h1>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <ul className="list-unstyled">
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
        </div>
    );
};


export default PetsBloodTests;
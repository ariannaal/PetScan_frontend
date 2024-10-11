import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Disease = () => {
    const { diseaseId } = useParams();
    const [symptoms, setSymptoms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [diseaseInfo, setDiseaseInfo] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchSymptoms = async () => {
            setLoading(true);
            try {
                const url = `http://localhost:3001/disease/${diseaseId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Errore API:', errorMessage);
                    throw new Error('Errore nel recupero dei dati');
                }

                const data = await response.json();
                console.log("Sintomi:", data);

                if (Array.isArray(data)) {
                    setSymptoms(data);

                    setDiseaseInfo(data[0]?.name);
                    setDescription(data[0]?.description);
                } else {
                    console.error('I risultati non sono disponibili o non sono un array:', data);
                    setSymptoms([]);
                }
            } catch (error) {
                console.error('Errore durante il recupero dei sintomi:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSymptoms();
    }, [diseaseId]);

    return (
        <div>
            {loading ? (
                <p>Caricamento dei dati...</p>
            ) : (
                <div className="container disease-description">
                    {diseaseInfo ? (
                        <>
                            <h1 className="text-center mt-5 mb-5 login-title">{diseaseInfo}</h1>
                            <p>{description}</p>
                            {symptoms.length > 0 ? (
                                <div>
                                    <h3 className="my-4 login-title">Sintomi:</h3>
                                    <ul>
                                        {symptoms.map((symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>Nessun sintomo trovato.</p>
                            )}
                        </>
                    ) : (
                        <p>Malattia non trovata.</p>
                    )}
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Disease;
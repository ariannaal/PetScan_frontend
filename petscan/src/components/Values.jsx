
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DownloadPDF from "./DownloadPDF";


const Values = () => {
    const { bloodTestId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const [surname, setSurname] = useState('');
    const [testNumber, setTestNumber] = useState('');
    const [dateOfTest, setDateOfTest] = useState('');
    const [petName, setPetName] = useState('');
    const [gender, setGender] = useState('');
    const [petType, setPetType] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');




    console.log("bloodTestId:", bloodTestId);





    useEffect(() => {
        const fetchResults = async () => {
            try {
                const url = `http://localhost:3001/results/${bloodTestId}/values`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("Dati ricevuti:", data);


                if (data.results && Array.isArray(data.results)) {
                    setResults(data.results);
                    setOwnerName(data.ownerName || '');
                    setSurname(data.surname || '');
                    setPetType(data.petType || '');
                    setTestNumber(data.testNumber || '');
                    setDateOfTest(data.dateOfTest || '');
                    setPetName(data.petName || '');
                    setGender(data.gender || '');
                    setBreed(data.breed || '');
                    setAge(data.age || '');
                } else {
                    console.error('I risultati non sono disponibili o non sono un array:', data);
                    setResults([]);
                }
            } catch (error) {
                console.error('Errore durante il recupero dei risultati:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (bloodTestId) {
            fetchResults();
        }
    }, [bloodTestId]);



    return (
        <div className="values-container container" >
            <h1 className="text-center mt-5 mb-5 login-title">Risultati degli esami</h1>

            <DownloadPDF results={results} ownerName={ownerName} surname={surname} testNumber={testNumber} dateOfTest={dateOfTest} petName={petName} gender={gender} breed={breed} age={age} petType={petType} />

            <Row>

                <Col xs={6}>
                    <Row className="mb-3">
                        <Col xs={6} className="title-result">Parametro</Col>
                        <Col xs={6} className="title-result">Valore</Col>
                    </Row>

                    <div className="scrollable-container">
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((result, index) => (
                                <Row key={index} className="align-items-center mb-4">
                                    <Col xs={6} className="text-result">
                                        <span className="fw-bold">{result.valueName || 'N/A'}</span>
                                        <span className="ms-2">({result.unit ? result.unit.join(', ') : 'N/A'})</span>
                                    </Col>
                                    <Col xs={6} className="text-result">{result.value !== undefined ? result.value : 'N/A'}</Col>
                                </Row>
                            ))
                        ) : (
                            <div>Nessun risultato disponibile.</div>
                        )}


                    </div>
                </Col>

                <Col xs={6}>
                    <Row className="mb-4">
                        <Col className="ps-5">
                            <h5 className="title-result mb-4">Possibile quadro patologico:</h5>
                            {(() => {
                                // per tenere traccia delle patologie uniche
                                const uniqueConditions = {};

                                // mappo per estrarre le patologie
                                return results.map(result => {
                                    const condition = result.pathologicalCondition;

                                    if (condition) {
                                        const conditionName = condition.split(" (")[0];

                                        // controllo se la patologia e' gia stata aggiunta
                                        if (!uniqueConditions[conditionName]) {
                                            uniqueConditions[conditionName] = true; // se no la aggiungo all'oggetto
                                            return (

                                                <p className="my-2" key={conditionName}>
                                                    {conditionName.charAt(0).toUpperCase() + conditionName.slice(1)}
                                                </p>
                                            );
                                        }
                                    }
                                    return null;
                                }).filter(Boolean);
                            })()}

                            {results.every(result => !result.pathologicalCondition) && (
                                <p>Nessuna condizione patologica trovata.</p>
                            )}
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>


    );
};

export default Values;
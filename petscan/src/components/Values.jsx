
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DownloadPDF from "./DownloadPDF";


const Values = () => {
    const { bloodTestId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    console.log("bloodTestId:", bloodTestId);



    const [results, setResults] = useState([]);

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
                console.log("Dati con tutto:", data);


                setResults(data);

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

            <DownloadPDF results={results} />

            <Row>

                <Col xs={6}>
                    <Row className="mb-3">
                        <Col xs={6} className="title-result">Parametro</Col>
                        <Col xs={6} className="title-result">Valore</Col>
                    </Row>

                    <div className="scrollable-container">
                        {results && results.map((result, index) => (
                            <Row key={index} className="align-items-center mb-4">
                                <Col xs={6} className="text-result">
                                    <span className="fw-bold">{result.valueName}</span>
                                    <span className="ms-2">({result.unit})</span>
                                </Col>
                                <Col xs={6} className="text-result">{result.value}</Col>
                            </Row>
                        ))}
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
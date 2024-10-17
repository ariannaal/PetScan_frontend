
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DownloadPDF from "./DownloadPDF";
import { Modal } from "react-bootstrap";
import MyChart from "./MyChart";


const Values = () => {
    const { bloodTestId } = useParams();
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
    const [symptoms, setSymptoms] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleShow = (condition) => {
        setSelectedCondition(condition);
        fetchSymptoms(condition.id);
        setShow(true);
    };

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

                    if (data.results.length > 0 && data.results[0].pathologicalConditions.length > 0) {
                        const firstCondition = data.results[0].pathologicalConditions[0];
                        fetchSymptoms(firstCondition.id);
                    }
                } else {
                    console.error('I risultati non sono disponibili', data);
                    setResults([]);
                }
            } catch (error) {
                console.error('Errore durante il recupero dei risultati:', error);
            }
        };

        if (bloodTestId) {
            fetchResults();
        }
    }, [bloodTestId]);

    const fetchSymptoms = async (diseaseId) => {
        try {
            const response = await fetch(`http://localhost:3001/symptoms/disease/${diseaseId}`, {
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
            setSymptoms(data.symptomDescription || []);
        } catch (error) {
            console.error('Errore durante il recupero dei sintomi:', error);
        }
    };

    const capitalizeAndSpace = (value) => {
        return value.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    };

    return (
        <div className="values-container container">
            <h1 className="text-center mt-5 mb-5 login-title">Risultati degli esami</h1>

            <Row className="mt-5">
                <Col xs={12} md={6} className='no-scroll mb-4'>
                    <Row className="mb-3">
                        <Col xs={6} className="title-result">Parametro</Col>
                        <Col xs={6} className="title-result">Valore</Col>
                    </Row>

                    <div className="scrollable-container">
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((result, index) => (
                                <Row key={index} className="align-items-center mb-4">
                                    <Col xs={4} className="text-result">
                                        <span className="fw-bold">{capitalizeAndSpace(result.valueName) || 'N/A'}</span>
                                    </Col>
                                    <Col xs={4} className="text-result">{result.value} <span className="ms-2">({result.unit})</span></Col>
                                    <Col xs={4} className="mt-2"> <MyChart minValue={result.minValue} maxValue={result.maxValue} currentValue={result.value} /></Col>
                                </Row>
                            ))
                        ) : (
                            <div>Nessun risultato disponibile.</div>
                        )}
                    </div>
                </Col>

                <Col xs={12} md={6} className='no-scroll'>
                    <Row className="mb-4">
                        <Col className="ps-5">
                            <div className="d-flex justify-content-between">
                                <h5 className="title-result mb-4 mt-2">Possibile quadro patologico</h5>
                                <DownloadPDF results={results} ownerName={ownerName} surname={surname} petName={petName} petType={petType} age={age} gender={gender} breed={breed} dateOfTest={dateOfTest} testNumber={testNumber} />
                            </div>

                            {(() => {
                                const uniqueConditions = new Set();

                                return results.map(result => {
                                    const conditions = result.pathologicalConditions;

                                    return conditions.map(condition => {
                                        const conditionName = condition.name;

                                        if (!uniqueConditions.has(conditionName)) {
                                            uniqueConditions.add(conditionName);
                                            return (
                                                <div key={condition.id} className="div-disease">
                                                    <div
                                                        className="text-result disease-link"
                                                        onClick={() => handleShow(condition)}
                                                    >
                                                        {conditionName.charAt(0).toUpperCase() + conditionName.slice(1)}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }).filter(Boolean);
                                }).flat();
                            })()}

                            {results.every(result => result.pathologicalConditions.length === 0) && (
                                <p>Nessuna condizione patologica trovata.</p>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div className="text-center mt-5">
                <Button onClick={() => navigate('/options')} className='button-login rounded-pill px-4'>Torna al menù</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="disease-title">
                    <Modal.Title>{selectedCondition ? selectedCondition.name : "Dettagli malattia"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCondition ? (
                        <>
                            <p>{selectedCondition.description || "Descrizione non disponibile."}</p>
                            <h6 className="disease-title fs-5">Sintomi:</h6>
                            {symptoms.length > 0 ? (
                                <ul >
                                    {symptoms.map((symptom, index) => (
                                        <li className="disease-symptoms" key={index}>{symptom}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nessun sintomo disponibile.</p>
                            )}
                        </>
                    ) : null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Values;
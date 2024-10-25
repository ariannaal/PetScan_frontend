
import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import pawPrints from '../assets/images/paws-prints.png';


const BloodTest = () => {

    const [results, setResults] = useState([
        { valuesNameId: "03a50be5-55d9-4c29-8e2a-cbf3f3e180fb", name: 'MPV', value: '' },
        { valuesNameId: "04d2b929-8f76-44a2-ad83-357f4c451d53", name: 'Eosinofili', value: '' },
        { valuesNameId: "101a742f-5c65-4591-92d9-357fcd048699", name: 'Reticolociti', value: '' },
        { valuesNameId: "1b06524f-bf44-460d-9619-4ea66eea0713", name: 'Ematocrito', value: '' },
        { valuesNameId: "200c5b74-0d8c-451b-89f7-197f4a123e6e", name: 'Cortisolo', value: '' },
        { valuesNameId: "32c01821-999b-440a-b21b-1edde63d88ef", name: 'Sodio', value: '' },
        { valuesNameId: "3f7c95d7-81c8-421d-8d7b-1edbd6c8cc8c", name: 'Eritrociti', value: '' },
        { valuesNameId: "499bed56-5c5b-4eb8-a05e-7f19364ca6c3", name: 'Bilirubina Totale', value: '' },
        { valuesNameId: "54c155ba-6941-4490-abac-7d960ee9c284", name: 'Emoglobina', value: '' },
        { valuesNameId: "646e4b6e-5850-47ea-a7db-1a65fdb5bb8c", name: 'T4', value: '' },
        { valuesNameId: "67297030-bb73-49f2-aab4-d09d2950aeb6", name: 'Neutrofili Segmentati', value: '' },
        { valuesNameId: "7967774a-a6af-4f3c-9424-48493183310e", name: 'Colesterolo', value: '' },
        { valuesNameId: "83450527-08de-42c2-9239-cbb5fc1afb73", name: 'Basofili', value: '' },
        { valuesNameId: "8e2229f3-9c8f-4079-8145-28cc0fc26656", name: 'Amilasi', value: '' },
        { valuesNameId: "90522ea1-04a1-4da3-a2c1-d1384ebeffe6", name: 'Glucosio', value: '' },
        { valuesNameId: "91647111-3c6f-426c-8b16-3c7c606c5f02", name: 'Lipasi', value: '' },
        { valuesNameId: "b45620ea-a70d-4d05-a3f9-cfda251ac003", name: 'Creatinina', value: '' },
        { valuesNameId: "b7b38c71-d92e-4b7d-97bd-4d94cc7f8de3", name: 'Urea', value: '' },
        { valuesNameId: "c9bd0ed0-3cbb-4340-953b-e11dcdd4a5e3", name: 'Fosfatasi Alcalina', value: '' },
        { valuesNameId: "cfbeb009-8d3f-4371-b3aa-f3aeb1ed0e0f", name: 'Monociti', value: '' },
        { valuesNameId: "d118c833-4c05-40f4-915b-49a789fcb18b", name: 'Piastrine', value: '' },
        { valuesNameId: "d57cd392-9afa-4317-afa8-b4a5f6cd1703", name: 'Potassio', value: '' },
        { valuesNameId: "e1fed32a-35e8-44c1-9840-380c1bfdab35", name: 'Leucociti', value: '' },
        { valuesNameId: "e623339a-b453-4b06-b0e2-02d237f0b38d", name: 'Fruttosamina', value: '' },
        { valuesNameId: "ec634b84-f34d-4b18-88a0-1e8fc4ee5d79", name: 'Albumina', value: '' },
        { valuesNameId: "f8c625c8-fd74-49fb-8d1c-282204501088", name: 'Linfociti', value: '' }
    ]);

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bloodTestId = queryParams.get('bloodTestId');
    const [loading, setLoading] = useState(false);

    const handleValueChange = (index, newValue) => {
        const updatedResults = [...results];
        updatedResults[index].value = newValue;
        setResults(updatedResults);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const resultsToSend = results.map(result => ({
                value: result.value,
                valuesNameId: result.valuesNameId,
            }));

            const body = {
                bloodTestId: bloodTestId,
                results: resultsToSend
            };


            const resultsResponse = await fetch(`http://localhost:3001/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(body),
            });

            if (resultsResponse.ok) {
                const responseData = await resultsResponse.json();
                console.log('Risultati salvati con successo!', responseData);
                navigate(`/results/${bloodTestId}/values`);
            } else {
                const errorText = await resultsResponse.text();
                console.error('Errore nel salvataggio:', errorText);
            }

        } catch (error) {
            console.error('Errore nel salvataggio:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container d-flex flex-column align-items-center justify-content-center  ">
            <h1 className="text-center mt-5 mb-3 login-title test-title">Inserisci il valore per ciascun parametro <span className="underline"></span></h1>
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute  img-fluid paws-values"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
            <Form onSubmit={handleSubmit} className="w-50 form-values">
                <Row>
                    {results.map((result, index) => (
                        <Col key={result.valuesNameId} xs={12} md={6} className="gy-4">
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    value={result.value}
                                    onChange={(e) => handleValueChange(index, e.target.value)}
                                    placeholder={`${result.name}`}
                                    className="custom-input"
                                />
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4 pathologies">
                    <Button type="submit" className='button-login mb-5 menu-button rounded-pill px-4'>Invia i risultati</Button>
                </div>
            </Form>
            {loading && (
                <div className="loading-spinner">
                    <Spinner animation="border" className="spinner mb-2" />
                </div>
            )}
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute  img-fluid paws-values-2"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
        </div>

    );
};



export default BloodTest;
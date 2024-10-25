import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import pawPrints from '../assets/images/paws-prints.png';
import { useState } from "react";


const UserOptions = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (path) => {
        setLoading(true);
        navigate(path);
        setLoading(false);
    };



    return (
        <>
            <div className="div-bloodtest">
                <Container className="d-flex justify-content-center align-items-center ">
                    <Row className="w-100 row-index">
                        <div className="form-container d-flex flex-column align-items-center justify-content-center my-5">

                            <h1 className="text-center my-5 login-title test-title">Cosa vuoi fare oggi? <span className="underline"></span></h1>

                        </div>

                        <Col xs={12} sm={6} lg={4} className="mb-4">
                            <Card className="h-100 text-center">
                                <Card.Body>
                                    <Card.Title className="card-title">Aggiungi un esame del sangue</Card.Title>
                                    <Card.Text className="card-option">
                                        Inserisci i dati relativi a un nuovo esame del sangue per uno dei tuoi animali.
                                    </Card.Text>
                                    <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/bloodTests')}>
                                        Aggiungi esame del sangue
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} lg={4} className="mb-4">
                            <Card className="h-100 text-center">
                                <Card.Body>
                                    <Card.Title className="card-title">Registra un nuovo animale</Card.Title>
                                    <Card.Text className="card-option">
                                        Aggiungi un nuovo animale al tuo profilo per monitorare la sua salute.
                                    </Card.Text>
                                    <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/add-pet')}>
                                        Registra nuovo animale
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} lg={4} className="mb-4">
                            <Card className="h-100 text-center" >
                                <Card.Body>
                                    <Card.Title className="card-title">Visualizza i tuoi animali</Card.Title>
                                    <Card.Text className="card-option">
                                        Visualizza le informazioni degli animali registrati nel tuo profilo, visualizza gli esami o modifica i dati.
                                    </Card.Text>
                                    <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/pets')}>
                                        Visualizza gli animali
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    {loading && (
                        <div className="d-flex justify-content-center mt-4">
                            <Spinner animation="border" className="spinner" />
                        </div>
                    )}

                    <img
                        src={pawPrints}
                        alt="prints"
                        className="position-absolute  img-fluid paw-prints"
                        style={{ width: '650px', height: 'auto', zIndex: 0 }}
                    />

                </Container>

            </div>
        </>
    )
}

export default UserOptions;
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';


const UserOptions = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };



    return (

        <Container className="d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <div className="form-container d-flex flex-column align-items-center justify-content-center my-5">

                    <h1 className="text-center my-5 login-title">Cosa vuoi fare oggi? <span className="underline"></span></h1>

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
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <Card.Title className="card-title">Modifica i dati di un animale</Card.Title>
                            <Card.Text className="card-booptiondy">
                                Aggiorna le informazioni di un animale già registrato nel tuo profilo.
                            </Card.Text>
                            <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/pets')}>
                                Modifica dati animale
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <Card.Title className="card-title">Visualizza esami precedenti</Card.Title>
                            <Card.Text className="card-option">
                                Consulta gli esami del sangue precedenti dei tuoi animali.
                            </Card.Text>
                            <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/pets')}>
                                Visualizza esami
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <Card.Title className="card-title">Elimina un animale</Card.Title>
                            <Card.Text className="card-option">
                                Rimuovi un animale dal tuo profilo per non visualizzarlo più.
                            </Card.Text >
                            <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/delete-pet')}>
                                Elimina animale
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100 text-center">
                        <Card.Body >
                            <Card.Title className="card-title">Modifica i tuoi dati</Card.Title>
                            <Card.Text className="card-option">
                                Aggiorna le tue informazioni personali, come nome, email e password.
                            </Card.Text>
                            <Button className='button-login my-3 rounded-pill px-4' onClick={() => handleNavigate('/edit-user')}>
                                Modifica dati personali
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>

    )
}

export default UserOptions;
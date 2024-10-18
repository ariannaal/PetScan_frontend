import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import pawPrints from '../assets/images/paws-prints.png';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    return (
        <div>
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute  img-fluid paws-about-us-2"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
            <Container className="my-5">
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={10}>
                        <Card className="p-4 shadow-sm card-about-us">
                            <Card.Body>
                                <h1 className="text-center mb-4 about-us">Chi siamo</h1>
                                <p className="lead text-justify">
                                    Benvenuti su <strong>Petscan</strong>, la piattaforma dedicata a tutti i proprietari di cani e gatti che desiderano monitorare in modo semplice e immediato la salute dei loro amati animali.
                                    Petscan nasce con l&apos;obiettivo di rendere più accessibile e comprensibile l&apos;interpretazione degli esami del sangue, uno strumento essenziale per diagnosticare tempestivamente eventuali patologie.
                                </p>
                                <h3 className="mt-4 about-us">Come funziona?</h3>
                                <p className="text-justify">
                                    Attraverso <strong>Petscan</strong>, puoi inserire i risultati degli esami del sangue dei tuoi animali, ottenendo subito un quadro potenziale delle loro condizioni di salute. La piattaforma analizza i dati, confrontandoli con i valori di riferimento e segnalando eventuali anomalie che potrebbero indicare patologie in atto. In pochi semplici passaggi, avrai una panoramica chiara della situazione, senza dover attendere lunghi tempi per interpretare i risultati.
                                </p>
                                <h3 className="mt-4 about-us">Perché scegliere Petscan?</h3>
                                <p className="text-justify">
                                    Pur essendo fondamentale rivolgersi al veterinario in caso di necessità, <strong>Petscan</strong> ti offre un modo rapido e pratico per ottenere un primo riscontro sui risultati degli esami del sangue dei tuoi animali, direttamente da casa. Ecco alcuni vantaggi:
                                </p>
                                <ul className="mb-4">
                                    <li><strong>Accessibilità immediata:</strong> Non devi attendere l&apos; appuntamento con il veterinario per ottenere un&apos;interpretazione preliminare degli esami.</li>
                                    <li><strong>Monitoraggio continuo:</strong> Puoi tenere traccia dei cambiamenti nei valori ematici nel tempo, così da essere sempre aggiornato sulla salute del tuo animale.</li>
                                    <li><strong>Prevenzione anticipata:</strong> Petscan aiuta a individuare anomalie che potrebbero sfuggire, permettendoti di intervenire precocemente.</li>
                                    <li><strong>Risparmio di tempo:</strong> Con pochi click, ottieni una valutazione diretta che ti guida verso la scelta successiva, risparmiando tempo prezioso.</li>
                                </ul>
                                <p className="text-justify">
                                    Petscan non sostituisce l’esperienza e la competenza del veterinario, ma ti fornisce un supporto valido per la comprensione degli esami. È un alleato prezioso per chiunque voglia prendersi cura al meglio della salute del proprio cane o gatto, offrendo un modo semplice e intuitivo di tenere sotto controllo i parametri vitali.
                                </p>
                                <h3 className="mt-4 about-us">La nostra missione</h3>
                                <p className="text-justify">
                                    Il nostro obiettivo è quello di mettere al centro la salute degli animali e il benessere dei loro proprietari. Crediamo che, grazie a Petscan, ognuno possa avere gli strumenti giusti per prendere decisioni informate e tempestive riguardo la salute del proprio amico a quattro zampe.
                                </p>
                                <p className="text-center mt-5">
                                    <strong>Petscan</strong> – Il tuo alleato per la salute degli animali, sempre al tuo fianco.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute  img-fluid paw-prints paws-about-us"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
            <div className="d-flex justify-content-center">
                <Button className='button-login mb-5 rounded-pill px-4' onClick={handleClick} type="submit">
                    Torna alla home
                </Button>
            </div>

        </div>
    );
};

export default AboutUs;
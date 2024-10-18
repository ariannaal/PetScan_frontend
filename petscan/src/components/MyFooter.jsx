import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const MyFooter = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="justify-content-center">
                    <Col md={4} className="text-center">
                        <h2>Seguici</h2>
                        <div className="social-icons">
                            <NavLink to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={30} />
                            </NavLink>
                            <NavLink to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook size={30} />
                            </NavLink>
                            <NavLink to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={30} />
                            </NavLink>
                            <NavLink to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube size={30} />
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="text-center">
                        <p className="copy">© 2024 PetScan. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default MyFooter;
import { useEffect, useState } from "react";
import pawPrints from '../assets/images/paws-prints.png';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const [owner, setOwner] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const response = await fetch(`http://localhost:3001/owners/me`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch owner data');
                }

                const data = await response.json();
                setOwner(data);
            } catch (error) {
                console.error("Error fetching owner:", error);
            }
        };

        if (accessToken) {
            fetchOwner();
        } else {
            setOwner(null);
        }
    }, [accessToken]);

    if (owner === null) {
        return (
            <div className="d-flex flex-column mt-5 align-items-center justify-content-center">
                <h1 className="text-center my-5 login-title test-title">
                    Il tuo account<span className="underline"></span>
                </h1>
                <img
                    src={pawPrints}
                    alt="prints"
                    className="position-absolute  img-fluid paw-prints"
                    style={{ width: '650px', height: 'auto', zIndex: 0 }}
                />
                <div>Effettua il login o registrati per visualizzare il tuo account.</div>
                <div className="d-flex mt-5 align-items-baseline account-container">

                    <Button className='button-login me-2 rounded-pill px-4' onClick={() => navigate('/auth/login')}>
                        Login
                    </Button>
                    <Button className='button-login me-2 rounded-pill px-4' onClick={() => navigate('/auth/register')}>
                        Registrati
                    </Button>
                </div>
                <img
                    src={pawPrints}
                    alt="prints"
                    className="position-absolute  img-fluid paws-values"
                    style={{ width: '650px', height: 'auto', zIndex: 0 }}
                />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center my-5 login-title test-title">
                Il mio account<span className="underline"></span>
            </h1>

            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paws-account-2"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />

            <div className="account-container">
                <p><strong>Nome:</strong> {owner.name}</p>
                <p><strong>Cognome:</strong> {owner.surname}</p>
                <p><strong>Email:</strong> {owner.email}</p>
                <p><strong>Data di nascita:</strong> {owner.dateOfBirth}</p>
                <p><strong>Genere:</strong> {owner.gender === 'FEMALE' ? 'Femmina' : 'Maschio'}</p>
                <div className="d-flex justify-content-center mb-3">
                    <Button className='button-login mt-4 rounded-pill px-4' onClick={() => navigate('/account/edit')}>
                        Modifica
                    </Button>
                </div>
            </div>

            <img
                src={pawPrints}
                alt="prints"
                className="position-absolute img-fluid paw-prints paws-about-us"
                style={{ width: '650px', height: 'auto', zIndex: 0 }}
            />
        </div>
    );
};

export default Account;
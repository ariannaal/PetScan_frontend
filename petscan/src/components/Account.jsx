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

        fetchOwner();
    }, [accessToken]);

    if (!owner) {
        return <div>Caricamento...</div>;
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
                    <Button className='button-login mb-5 rounded-pill px-4' onClick={() => navigate('/account/edit')}>Modifica</Button></div>
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
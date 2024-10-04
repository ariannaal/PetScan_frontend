import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-color position-sticky">
            <div className="container-fluid">

                <a className="text-white gluten-font " href="#">
                    <img
                        src="/src/assets/images/logo.png"
                        alt="logo"
                        width="75"
                        height="75"
                        className="d-inline-block mx-1"
                    />
                    PetScan
                </a>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item me-4">
                            <Link className="nav-link active nunito-font text-white" aria-current="page" to="/">HOME</Link>

                        </li>
                        <li className="nav-item me-4">
                            <a className="nav-link nunito-font text-white" href="#">SU DI NOI</a>
                        </li>
                        <li className="nav-item me-4">
                            <a className="nav-link nunito-font text-white" href="#">ANALISI DEL SANGUE</a>
                        </li>
                        <li className="nav-item dropdown me-1">
                            <a
                                className="nav-link dropdown-toggle nunito-font text-white"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                ACCOUNT
                            </a>
                            <ul className="dropdown-menu custom-dropdown-menu dropdown-menu-end " aria-labelledby="userDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">Login</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Signup</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Log out</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;
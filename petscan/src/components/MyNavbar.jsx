import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {

    const handleLogout = () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('firstName');

        window.location.href = '/auth/login';
    };


    return (

        <Navbar className="navbar-color position-sticky" expand="lg">
            <div className="container-fluid">
                <Link className="text-white gluten-font" to="/">
                    <img
                        src="/src/assets/images/logo.png"
                        alt="logo"
                        width="75"
                        height="75"
                        className="d-inline-block mx-1"
                    />
                    PetScan
                </Link>

                <Navbar.Toggle
                    aria-controls="navbarNav"
                    className="navbar-toggler"
                />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link active nunito-font text-white" aria-current="page">HOME</Nav.Link>
                        <Nav.Link as={Link} to="/" className="nav-link nunito-font text-white">CHI SIAMO</Nav.Link>
                        <Nav.Link as={Link} to="/options" className="nav-link nunito-font text-white">MENU</Nav.Link>
                        <Nav.Link as={Link} to="/bloodTests" className="nav-link nunito-font text-white">ANALISI DEL SANGUE</Nav.Link>
                        <NavLink className="nav-item dropdown me-1">
                            <Link
                                className="nav-link dropdown-toggle nunito-font text-white"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                ACCOUNT
                            </Link>
                            <ul className="dropdown-menu custom-dropdown-menu dropdown-menu-end " aria-labelledby="userDropdown">
                                <NavLink>
                                    <Link className="dropdown-item" as={Link} to="/auth/login">Login</Link>
                                </NavLink>
                                <NavLink>
                                    <Link className="dropdown-item" as={Link} to="/auth/register">Signup</Link>
                                </NavLink>
                                <NavLink>
                                    <hr className="dropdown-divider" />
                                </NavLink>
                                <NavLink>
                                    <Link className="dropdown-item" href="#" onClick={handleLogout}>Log out</Link>
                                </NavLink>
                            </ul>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default MyNavbar;
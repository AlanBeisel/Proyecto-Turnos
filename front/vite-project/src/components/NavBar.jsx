import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Login from '../views/Login';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducer';

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
  const dispatch = useDispatch(); 

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" id="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn && <Nav.Link as={Link} to="/misTurn">Mis turnos</Nav.Link>}
              <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
              <Nav.Link onClick={isLoggedIn ? handleLogout : handleLoginClick}>
                {isLoggedIn ? (
                  <Link to="/" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>
                    Cerrar sesión
                  </Link>
                ) : 'Iniciar sesión'}
              </Nav.Link>
              <Nav.Link as={Link} to="/Register" style={{ display: isLoggedIn ? 'none' : 'block' }}>Registrarme</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;

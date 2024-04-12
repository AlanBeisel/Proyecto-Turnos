import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Login from '../views/Login'; 


const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn && <Nav.Link href="/misTurn">Mis turnos</Nav.Link>}
              <Nav.Link href="/contacto">Contacto</Nav.Link>
              <Nav.Link onClick={handleLoginClick}>
                {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
              </Nav.Link>
              <Nav.Link href="/Register" style={{display: isLoggedIn? 'none' : 'block'}}>Registrarme</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} onLogout={handleLogout} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;






























// import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';

// const NavBar = () => {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//     <Container>
//       <Navbar.Brand href="/">Home</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ms-auto">
//         <Nav.Link href="/misTurn">Mis turnos</Nav.Link>
//           <Nav.Link href="/contacto">Contacto</Nav.Link>
//           <Nav.Link href="/login">Iniciar sesión</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Container>
//   </Navbar>
//   );
// }

// export default NavBar;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Contacto = () => {
    return (
        <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="contact-info bg-white p-4">
              <div className="contact-description">
                <div className="contact-container">
                  <h2>Contáctanos</h2>
                  <p>
                    ¡Estamos aquí para ayudarte! Si tienes alguna pregunta, comentario o consulta, no dudes en ponerte en contacto con nosotros.
                  </p>
                </div>
                <div className="contact-details">
                  <h3>Detalles de contacto</h3>
                  <ul>
                    <li>Teléfono: 123-456-7890</li>
                    <li>Correo electrónico: info@clinica.com</li>
                    <li>Dirección: Calle Falsa 123, Ciudad Ficticia</li>
                  </ul>
                </div>
              </div>
              <div className="contact-image-container bg-white p-1 mt-1">
                <img src="https://i.pinimg.com/564x/76/77/e5/7677e5c68b6e76c7f36b73b6e1a36a88.jpg" alt="Contacto" className="contact-image img-fluid" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

export default Contacto;
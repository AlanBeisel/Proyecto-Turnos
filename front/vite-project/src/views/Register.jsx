import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { validateRegistration } from '../../helpers/validations';


const Register = () => {
  const initialFormData = {
    name: '',
    email: '',
    brithdate: '',
    nDni: '',
    username: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

   
    
    axios.post('http://localhost:3000/users/register', formData)
    .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setSuccessMessage('¡Usuario creado exitosamente!');
        setFormData(initialFormData);
      })
      .catch(error => {
        console.error('Error al registrar el usuario:', error);
      });
    }


const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <Alert variant="danger">{errors[fieldName]}</Alert>
    ) : null;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {renderError('name')}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {renderError('email')}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBirthdate">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su fecha de nacimiento (dd/mm/aaaa)"
          name="brithdate"
          value={formData.brithdate}
          onChange={handleChange}
        />
         {renderError('brithdate')}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDni">
        <Form.Label>DNI</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su DNI"
          name="nDni"
          value={formData.nDni}
          onChange={handleChange}
        />
         {renderError('nDni')}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
         {renderError('username')}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
         {renderError('password')}
      </Form.Group>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Button variant="primary" type="submit">
        Registrarse
      </Button>
      
    </Form>
  );
};

export default Register;
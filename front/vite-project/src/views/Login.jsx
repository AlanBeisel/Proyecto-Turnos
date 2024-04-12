import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/users/login', {
          username,
          password
        });
        console.log('Respuesta del servidor:', response.data);
        setLoginMessage('Ha iniciado sesión correctamente.');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setLoginMessage('Error al iniciar sesión. Verifica tus credenciales.');
      }
    };

  return (
    <div>
         {loginMessage && <p>{loginMessage}</p>}
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="username"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
    </div>
  );
};

export default Login;
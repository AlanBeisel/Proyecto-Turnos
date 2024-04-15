import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/reducer';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const error = useSelector(state => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password
      });
      console.log('Respuesta del servidor:', response.data);
      // Dispatch de la acción para indicar inicio de sesión exitoso
      dispatch(loginSuccess({ userId: response.data.user.id }));
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Dispatch de la acción para indicar error al iniciar sesión
      dispatch(logout());
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoggedIn ? (
        <p>¡Ya has iniciado sesión!</p>
      ) : (
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
      )}
    </div>
  );
};

export default Login;

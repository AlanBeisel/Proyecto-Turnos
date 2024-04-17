import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/reducer';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
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
      dispatch(loginSuccess({ userId: response.data.user.id }));
      onLoginSuccess(); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      dispatch(logout());
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
    {error && <p>{error}</p>}
    {isLoggedIn ? (
      <p>¡Ya has iniciado sesión!</p>
    ) : (
      <div>
        {loginError && <Alert variant="danger">{loginError}</Alert>} {/* Mostrar el mensaje de error */}
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
      )}
    </div>
  );
};

export default Login;


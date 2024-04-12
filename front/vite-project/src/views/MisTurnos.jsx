import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { validateRequired, validateDate, validateTime } from '../../helpers/validations'; 
import Turno from '../components/Turno';

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTurnoData, setNewTurnoData] = useState({
    date: '',
    time: '',
    descripcion: ''
  });

  useEffect(() => {
    fetchTurnos();
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointment');
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
    }
  };

  const addAppointment = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/appointment/nuevo', newTurnoData);
        console.log('Respuesta del servidor:', response.data);
        fetchTurnos();
        setShowForm(false);
        setNewTurnoData({
          date: '',
          time: '',
          descripcion: ''
        });
      } catch (error) {
        console.error('Error al agregar el turno:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTurnoData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!validateRequired(newTurnoData.date)) {
      errors.date = 'La fecha es requerida';
      valid = false;
    } else if (!validateDate(newTurnoData.date)) {
      errors.date = 'La fecha no es válida';
      valid = false;
    }

    if (!validateRequired(newTurnoData.time)) {
      errors.time = 'La hora es requerida';
      valid = false;
    } else if (!validateTime(newTurnoData.time)) {
      errors.time = 'La hora no es válida';
      valid = false;
    }

    if (!validateRequired(newTurnoData.descripcion)) {
      errors.descripcion = 'La descripción es requerida';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <>
      <h1>Mis turnos:</h1>
     
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newTurnoData.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hora del turno:</Form.Label>
            <Form.Control
            as="select"
            name="time"
            value={newTurnoData.time}
            onChange={handleChange}
            >
            <option value="">Seleccione la hora</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={newTurnoData.descripcion}
              onChange={handleChange}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">
            Solicitar
          </Button>
        </Form>
      )}

      {turnos.length === 0 && (
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>¡No tienes turnos aún!</p>
        <p style={{ fontSize: '16px' }}>Pero puedes solicitar uno ahora mismo.</p>
        <Button variant="primary" onClick={addAppointment}>
        {showForm ? 'Cancelar' : 'Solicitar Turno'}
      </Button>
      </div>
    )}

      <div className="container mt-4">
        {turnos.map((turno) => (
          <Turno
            key={turno.id}
            date={turno.date}
            time={turno.time}
            status={turno.status}
            descripcion={turno.descripcion}
            conCancel={() => cancelTurno(turno.id)}
          />
        ))}
      </div>
    </>
  );
};

export default MisTurnos;

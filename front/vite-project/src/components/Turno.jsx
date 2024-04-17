import '../styles/turno.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

const Turno = ({ id, date, time, status, descripcion, onCancel }) => {
  const [isCancelled, setIsCancelled] = useState(status === 'cancelled');

  const handleCancelClick = async () => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de que deseas cancelar este turno?"
    );
    if (confirmCancel) {
      try {
        await axios.put(`http://localhost:3000/appointment/cancel/${id}`);
        setIsCancelled(true);
        onCancel();
      } catch (error) {
        console.error('Error al cancelar el turno:', error);
      }
    }
  };

  return (
    <div className={`turno-container ${isCancelled ? 'cancelled' : ''}`}>
      <div className="fecha">Fecha: {date}</div> 
      <div className="duracion">Duración: {time}</div> 
      <div className="estado">Estado: {isCancelled ? 'Cancelado' : status}</div>{' '}
      <div className="descripcion">
        Descripción: {descripcion}
      </div>{' '}
      <Button variant="danger" onClick={handleCancelClick} disabled={isCancelled}>
        {isCancelled ? 'Turno Cancelado' : 'Cancelar Turno'}
      </Button>
    </div>
  );
};

export default Turno;
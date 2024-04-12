import '../styles/turno.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Turno = ({date, time, status, descripcion}) => {
  const [isCancelled, setIsCancelled] = useState(false);

  const handleCancelClick = () => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de que deseas cancelar este turno?"
    );
    if (confirmCancel) {
      setIsCancelled(true);
      onCancel();
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
        Cancelar Turno
      </Button>
    </div>
  );
};

export default Turno
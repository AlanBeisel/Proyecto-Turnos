import '../styles/turno.css'



const Turno = ({date, time, status, descripcion}) => {
    return (
        <div className="turno-container"> {/* Aplica un contenedor para el turno */}
        <div className="fecha">Fecha: {date}</div> {/* Estilo para la fecha */}
        <div className="duracion">Duración: {time}</div> {/* Estilo para la duración */}
        <div className="estado">Estado: {status}</div> {/* Estilo para el estado */}
        <div className="descripcion">Descripción: {descripcion}</div> {/* Estilo para la descripción */}
      </div>
    )
}

export default Turno
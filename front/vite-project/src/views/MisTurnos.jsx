import { useState } from "react"
import misTurnosData from "../../helpers/misTurnosData"
import '../styles/global.css'
import Turno from "../components/Turno";

const MisTurnos = () => {
    const [turnos, setTurnos] = useState(misTurnosData);
    return (
        <>
        <h1>Mis turnos:</h1>

        <div>
        {turnos.map((turno, index) => (
          <Turno
            key={index}
            date={turno.date}
            time={turno.time}
            status={turno.status}
            descripcion={turno.descripcion}
          />
        ))}
      </div>
        </>
    )
}

export default MisTurnos;
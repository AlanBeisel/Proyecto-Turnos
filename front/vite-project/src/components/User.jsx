import { useState } from "react"



const User = ({handleUserButtonClick}) => {
    const [updateData, setUpDate] = useState("Editando...")

    const handleUpdateData = () => {
        setUpDate("Actualizado")
        handleUserButtonClick("se actualizo el perfil")
    }

    return (
        <div>
            <button onClick={handleUpdateData}>Actualizar perfil</button>
            <p>Estado del perfil: {updateData}</p>
        </div>
    )
}
export default User;
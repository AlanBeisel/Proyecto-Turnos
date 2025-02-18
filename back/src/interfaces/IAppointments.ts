interface IAppointments {
    id: number;
    usuarioId: number;
    date: string; 
    time: string; 
    status: "active" | "canceled"; 
    descripcion: string; 
}

export default IAppointments;
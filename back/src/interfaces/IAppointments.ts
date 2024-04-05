interface IAppointments {
    Id: number;
    usuarioId: number;
    date: string; 
    time: string; 
    status: "active" | "canceled"; 
    descripcion: string; 
}

export default IAppointments;
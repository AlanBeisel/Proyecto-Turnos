interface AppointmentDto {
    usuarioId: number;
    date: string; 
    time: string; 
    status: "active" | "canceled"; 
    descripcion: string; 
}

export default AppointmentDto;
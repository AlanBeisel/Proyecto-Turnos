interface AppointmentDto {
    userId: number;
    date: string; 
    time: string; 
    status: "active" | "cancelled"; 
    descripcion: string; 
}

export default AppointmentDto;
import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointments";
import IAppointment from "../interfaces/IAppointments"; // Suponiendo que tienes esta interfaz para las citas

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const appointments = await AppointmentModel.find({
            relations: {
                user: true
            }
        });
        return appointments;
    } catch (error) {
        console.error('Error al obtener listado de citas en el servicio:', error);
        throw new Error('Hubo un error al obtener listado de citas en el servicio.');
    }
};

export const getAppointmentByIdService = async (id: number): Promise<IAppointment | null> => {
    try {
        // Lógica para obtener una cita por su ID desde la base de datos
        const appointment: IAppointment | null = null;
        return appointment;
    } catch (error) {
        console.error('Error al obtener cita por ID en el servicio:', error);
        throw new Error('Hubo un error al obtener cita por ID en el servicio.');
    }
};

export const scheduleAppointmentService = async (appointment: AppointmentDto): Promise<Appointment> => {
    const newAppointment= await AppointmentModel.create(appointment);
    await AppointmentModel.save(newAppointment);

    const user = await UserModel.findOneBy({
        id: appointment.usuarioId
    })
    if (user) {
    newAppointment.user= user;
            AppointmentModel.save(newAppointment);
        }
    return newAppointment;
};

export const cancelAppointmentService = async (): Promise<void> => {
    // Lógica para cancelar una cita en la base de datos
};
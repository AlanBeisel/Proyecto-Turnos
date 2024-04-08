import { AppDataSource, AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointments";


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

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    try {
        const appointment = await AppointmentModel.findOneBy({id});
        
        if (!appointment) {
            return null;
        }
        return appointment;
    } catch (error) {
        console.error('Error al obtener cita por ID en el servicio:', error);
        throw new Error('Hubo un error al obtener cita por ID en el servicio.');
    }
};

export const scheduleAppointmentService = async (appointment: AppointmentDto): Promise<Appointment | void> => {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect();

    try {
    queryRunner.startTransaction()


    const newAppointment = await AppointmentModel.create(appointment)
    await queryRunner.manager.save(newAppointment)

    const user = await UserModel.findOneBy({id: appointment.usuarioId})

    if(!user) throw Error("Usuario inexistente. No se creo la cita")
    
        newAppointment.user = user;
        await queryRunner.manager.save(newAppointment);

        await queryRunner.commitTransaction();

        return newAppointment;
    } catch(error) {
        await queryRunner.rollbackTransaction()
        throw Error("usuario inexistente, no se creo la cita")
    }finally {
        await queryRunner.release()
}
};

export const cancelAppointmentService = async (id: number) => {
        const appointment = await AppointmentModel.findOneBy({id});
        if (appointment) {
            appointment.status = 'canceled'; 
            await AppointmentModel.save(appointment);
        }
        
    }
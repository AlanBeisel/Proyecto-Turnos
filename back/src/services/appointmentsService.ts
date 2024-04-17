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

export const getAppointmentByIdService = async (userId: number): Promise<Appointment[]> => {
    try {
        const appointments = await AppointmentModel.find({ where: { userId } });
        
        return appointments;
    } catch (error) {
        console.error('Error al obtener turnos por ID de usuario en el servicio:', error);
        throw new Error('Hubo un error al obtener turnos por ID de usuario en el servicio.');
    }
};

export const scheduleAppointmentService = async (appointment: AppointmentDto): Promise<Appointment | void> => {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect();

    try {
    queryRunner.startTransaction()


    const newAppointment = await AppointmentModel.create(appointment)
    await queryRunner.manager.save(newAppointment)

    const user = await UserModel.findOneBy({id: appointment.userId})

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
            appointment.status = 'cancelled'; 
            await AppointmentModel.save(appointment);
        }
        
    }
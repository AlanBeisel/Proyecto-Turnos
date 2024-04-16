import { Request, Response } from 'express';
import { getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService, cancelAppointmentService } from '../services/appointmentsService';

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error al obtener listado de citas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener listado de citas.' });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        
        const userId = parseInt(req.params.id).toString();
        const appointments = await getAppointmentByIdService(parseInt(userId));
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ error: 'No se encontraron turnos para este usuario' });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error al obtener turnos por ID de usuario:', error);
        res.status(500).json({ error: 'Hubo un error al obtener turnos por ID de usuario.' });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const {userId, date, time, descripcion} = req.body;
    try {
        const newAppointment = await scheduleAppointmentService({
            userId,
            date,
            time,
            status: "active",
            descripcion
        })
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al agendar cita.' });
    }
};

export const cancelAppointmentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await cancelAppointmentService(parseInt(id));

        res.status(200).json({ message: 'La cita ha sido cancelada exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al cancelar la cita.' });
    }
};
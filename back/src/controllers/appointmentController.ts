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
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(parseInt(id));
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error al obtener cita por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener cita por ID.' });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    const {usuarioId, date, time, status, descripcion} = req.body;
    try {
        const newAppointment = await scheduleAppointmentService({
            usuarioId,
            date,
            time,
            status,
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
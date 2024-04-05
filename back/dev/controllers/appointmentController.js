"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentsService_1.getAllAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error al obtener listado de citas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener listado de citas.' });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(parseInt(id));
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json(appointment);
    }
    catch (error) {
        console.error('Error al obtener cita por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener cita por ID.' });
    }
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lógica para agendar una nueva cita
        res.status(201).json({ message: 'Cita agendada exitosamente' });
    }
    catch (error) {
        console.error('Error al agendar cita:', error);
        res.status(500).json({ error: 'Hubo un error al agendar cita.' });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lógica para cancelar una cita
        res.status(200).json({ message: 'Cita cancelada exitosamente' });
    }
    catch (error) {
        console.error('Error al cancelar cita:', error);
        res.status(500).json({ error: 'Hubo un error al cancelar cita.' });
    }
});
exports.cancelAppointment = cancelAppointment;

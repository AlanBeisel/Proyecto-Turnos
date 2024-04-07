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
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = [];
        return appointments;
    }
    catch (error) {
        console.error('Error al obtener listado de citas en el servicio:', error);
        throw new Error('Hubo un error al obtener listado de citas en el servicio.');
    }
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lógica para obtener una cita por su ID desde la base de datos
        const appointment = null;
        return appointment;
    }
    catch (error) {
        console.error('Error al obtener cita por ID en el servicio:', error);
        throw new Error('Hubo un error al obtener cita por ID en el servicio.');
    }
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield data_source_1.AppointmentModel.create(appointment);
    yield data_source_1.AppointmentModel.save(newAppointment);
    const user = yield data_source_1.UserModel.findOneBy({ id: appointment.usuarioId });
    if (user) {
        // Si user.appointments no está inicializado, inicialízalo como un arreglo vacío
        if (!user.appointments) {
            user.appointments = [];
        }
        // Agrega el nuevo appointment al arreglo de appointments del usuario
        user.appointments.push(newAppointment);
        // Guarda los cambios en el usuario
        yield data_source_1.UserModel.save(user);
    }
    else {
        throw new Error("Usuario inexistente");
    }
    return newAppointment;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    // Lógica para cancelar una cita en la base de datos
});
exports.cancelAppointmentService = cancelAppointmentService;

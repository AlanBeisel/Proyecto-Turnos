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
        const appointments = yield data_source_1.AppointmentModel.find({
            relations: {
                user: true
            }
        });
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
        const appointment = yield data_source_1.AppointmentModel.findOne({ relations: ['user'] });
        if (!appointment) {
            return null;
        }
        return appointment;
    }
    catch (error) {
        console.error('Error al obtener cita por ID en el servicio:', error);
        throw new Error('Hubo un error al obtener cita por ID en el servicio.');
    }
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        queryRunner.startTransaction();
        const newAppointment = yield data_source_1.AppointmentModel.create(appointment);
        yield queryRunner.manager.save(newAppointment);
        const user = yield data_source_1.UserModel.findOneBy({ id: appointment.usuarioId });
        if (!user)
            throw Error("Usuario inexistente. No se creo la cita");
        newAppointment.user = user;
        yield queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return newAppointment;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw Error("usuario inexistente, no se creo la cita");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield data_source_1.AppointmentModel.findOne({});
        if (!appointment) {
            throw new Error('La cita no existe');
        }
        appointment.status = 'canceled';
        yield data_source_1.AppointmentModel.save(appointment);
    }
    catch (error) {
        console.error('Error al cancelar cita en el servicio:', error);
        throw new Error('Hubo un error al cancelar cita en el servicio.');
    }
});
exports.cancelAppointmentService = cancelAppointmentService;

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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadAppointmentsData = exports.preloadCredentialData = exports.preloadUserData = void 0;
const data_source_1 = require("../config/data-source");
const preloadUsers = [
    {
        name: "Alan Beisel",
        email: "alanb@mail.com",
        brithdate: "19/12/95",
        nDni: 6549843,
        username: "alan222",
        password: "asdd4556"
    },
    {
        name: "marcelo haga",
        email: "marcelito@mainModule.com",
        brithdate: "18/11/94",
        nDni: 987513,
        username: "macelito444",
        password: "asddd444"
    },
    {
        name: "maria perez",
        email: "mariamaria@mail.com",
        brithdate: "17/01/82",
        nDni: 6543213,
        username: "mariama",
        password: "afjhasf"
    },
    {
        name: "marcos roberto",
        email: "marquitos@mail.com",
        brithdate: "12/02/42",
        nDni: 4455664,
        username: "marcoto",
        password: "safjbasoi"
    }
];
const preloadAppointments = [
    {
        usuarioId: 1,
        date: "sabado a la mañana",
        time: "dos horas",
        status: "active",
        descripcion: "ecografia",
    },
    {
        usuarioId: 2,
        date: "viernes a la noche",
        time: "media hora",
        status: "active",
        descripcion: "rayos x"
    },
    {
        usuarioId: 3,
        date: "lunes por la tarde",
        time: "2 horas",
        status: "active",
        descripcion: "medico clinico"
    },
    {
        usuarioId: 4,
        date: "martes a la siesta",
        time: "1 hora",
        status: "active",
        descripcion: "analisis"
    }
];
const preloadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const users = yield data_source_1.UserModel.find();
        if (users.length)
            return console.log("no se hizo la precarga porque ya hay datos");
        try {
            for (var _d = true, preloadUsers_1 = __asyncValues(preloadUsers), preloadUsers_1_1; preloadUsers_1_1 = yield preloadUsers_1.next(), _a = preloadUsers_1_1.done, !_a; _d = true) {
                _c = preloadUsers_1_1.value;
                _d = false;
                const user = _c;
                const newUser = yield data_source_1.UserModel.create(user);
                yield transactionalEntityManager.save(newUser);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = preloadUsers_1.return)) yield _b.call(preloadUsers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("Precarga de datos realizada con exito");
    }));
});
exports.preloadUserData = preloadUserData;
const preloadCredentialData = () => __awaiter(void 0, void 0, void 0, function* () {
    data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, e_2, _f, _g;
        try {
            for (var _h = true, preloadUsers_2 = __asyncValues(preloadUsers), preloadUsers_2_1; preloadUsers_2_1 = yield preloadUsers_2.next(), _e = preloadUsers_2_1.done, !_e; _h = true) {
                _g = preloadUsers_2_1.value;
                _h = false;
                const user = _g;
                const newCredential = yield data_source_1.CredentialModel.create({
                    username: user.username,
                    password: user.password
                });
                yield transactionalEntityManager.save(newCredential);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_h && !_e && (_f = preloadUsers_2.return)) yield _f.call(preloadUsers_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }));
});
exports.preloadCredentialData = preloadCredentialData;
const preloadAppointmentsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const promises = preloadAppointments.map((appoinment) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = yield data_source_1.AppointmentModel.create({
            usuarioId: appoinment.usuarioId,
            date: appoinment.date,
            time: appoinment.time,
            status: appoinment.status,
            descripcion: appoinment.descripcion
        });
        yield queryRunner.manager.save(newAppointment);
        const user = yield data_source_1.UserModel.findOneBy({ id: appoinment.usuarioId });
        if (!user)
            throw Error("usuario inexistente");
        newAppointment.user = user;
        queryRunner.manager.save(newAppointment);
    }));
    try {
        yield queryRunner.startTransaction();
        yield Promise.all(promises);
        console.log("precarga de citas cargada correctamente");
        yield queryRunner.commitTransaction();
    }
    catch (_j) {
        console.log("Erro al intentar crear las citas");
        yield queryRunner.rollbackTransaction();
    }
    finally {
        console.log("ha finalizado el intento de precarga");
        yield queryRunner.release();
    }
});
exports.preloadAppointmentsData = preloadAppointmentsData;

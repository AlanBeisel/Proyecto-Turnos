"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("../entities/Users");
const Appointments_1 = require("../entities/Appointments");
const Credentials_1 = require("../entities/Credentials");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "180623",
    database: "henry",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Users_1.User, Appointments_1.Appointment, Credentials_1.Credential],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(Users_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(Credentials_1.Credential);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appointments_1.Appointment);

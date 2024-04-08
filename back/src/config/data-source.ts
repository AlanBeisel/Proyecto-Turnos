import { DataSource } from "typeorm"
import { User } from "../entities/Users"
import { Appointment } from "../entities/Appointments"
import { Credential } from "../entities/Credentials"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "180623",
    database: "henry",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User)
export const CredentialModel= AppDataSource.getRepository(Credential)
export const AppointmentModel= AppDataSource.getRepository(Appointment)
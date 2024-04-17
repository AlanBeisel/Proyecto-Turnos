import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    date: string

    @Column()
    time: string

    @Column()
    status: "active" | "cancelled"
    
    @Column()
    descripcion: string

    @ManyToOne(() => User, (user)=> user.appointments)
    user: User
}
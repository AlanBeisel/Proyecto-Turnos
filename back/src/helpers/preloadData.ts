import { AppDataSource, AppointmentModel, CredentialModel, UserModel } from "../config/data-source";


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
]

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
]

export const preloadUserData= async() => {
AppDataSource.manager.transaction(async(transactionalEntityManager) => {
    
    const users =await UserModel.find()

    if (users.length) return console.log("no se hizo la precarga porque ya hay datos")
        
    for await (const user of preloadUsers) {
        const newUser = await UserModel.create(user);
        await transactionalEntityManager.save(newUser) 
    }   

    console.log("Precarga de datos realizada con exito")
})
}

export const preloadCredentialData = async() => {
    AppDataSource.manager.transaction(async (transactionalEntityManager) => {
       for await (const user of preloadUsers) {
        const newCredential = await CredentialModel.create({
            username: user.username,
            password: user.password
        });
        await transactionalEntityManager.save(newCredential)
       }
    })
}

export const preloadAppointmentsData= async () => {
    const queryRunner= AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const promises = preloadAppointments.map(async (appoinment) => {
        const newAppointment = await AppointmentModel.create({
            usuarioId: appoinment.usuarioId,
            date: appoinment.date,
            time: appoinment.time,
            status: appoinment.status as "active" | "canceled",
            descripcion: appoinment.descripcion
        })
        await queryRunner.manager.save(newAppointment);
        const user = await UserModel.findOneBy({id: appoinment.usuarioId})
        if(!user) throw Error("usuario inexistente")
            newAppointment.user = user;
        queryRunner.manager.save(newAppointment)
        })
        try{
        await queryRunner.startTransaction();
        await Promise.all(promises)
        console.log("precarga de citas cargada correctamente")
        await queryRunner.commitTransaction();
        } catch {
            console.log("Erro al intentar crear las citas")
            await queryRunner.rollbackTransaction()
        }finally{
            console.log("ha finalizado el intento de precarga");
            await queryRunner.release()
            
        }


}


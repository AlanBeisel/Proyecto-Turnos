import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadAppointmentsData, preloadCredentialData, preloadUserData,  } from "./helpers/preloadData";


const initializeApp = async () => {
    await AppDataSource.initialize()
    await preloadUserData()
    await preloadCredentialData()
    await preloadAppointmentsData();
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

initializeApp();
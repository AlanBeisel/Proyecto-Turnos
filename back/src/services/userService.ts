import UserDto from "../dto/UserDto";
import {CredentialModel, UserModel} from "../config/data-source";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credentials";
import { createCredentialService } from "./credentialService";


export const createUserService = async(userData: UserDto): Promise<User> => {
    try {
        const newCredential = await createCredentialService(
            userData.username,
            userData.password
        );
        CredentialModel.save(newCredential)
        const newUser: User = await UserModel.create({
            name: userData.name,
            email: userData.email,
            brithdate: userData.brithdate,
            nDni: userData.nDni,
            credential: newCredential
        });

        await UserModel.save(newUser);
        
        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Error('Hubo un error al crear el usuario');
    }
}
export const getUsersService = async (): Promise<User[]> => {
    const allUsers = await UserModel.find({
        relations: {
            appointments: true
        }
    });
    
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
        const user = await UserModel.findOne({where:{
            id
        }, relations: {
            appointments: true
        }})
        return user;
};

export const loginUserService = async (username: string, password: string): Promise<{ login: boolean, user?: User }> => {
    try {
         const credential = await CredentialModel.findOne({ where: { username } });
         console.log('Credencial encontrada:', credential);
         if (credential) {
             console.log('Credencial encontrada:', credential);
             if (credential.password === password) {
                 console.log('Contraseña válida');
                 const user = await UserModel.findOne({ where: { credential: credential }, relations: ['credential'] });
                 console.log('Usuario asociado encontrado:', user);
 
                 if (user) {
                     return { login: true, user };
                 }
             }
         }
 
         // Si no se encuentra la credencial o las contraseñas no coinciden, devolver false
         console.log('Credencial no encontrada o contraseña incorrecta');
         return { login: false };
     } catch (error) {
         // Manejar errores
         console.error('Error al intentar iniciar sesión:', error);
         throw new Error('Hubo un error al intentar iniciar sesión');
     }
 };

import { Request, Response } from "express";
import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUsers"
import { getAllUsers } from "../controllers/User.Controller";

let users: IUser[] = []

export let id: number = 1;

export const createUserService = async(userData: UserDto): Promise<IUser> => {
    const newUser: IUser = {
        id,
        name: userData.name,
        email: userData.email,
        brithdate: userData.brithdate,
        nDni: userData.nDni,
        credentialsId: userData.credentialsId
    }
    users.push(newUser)
    id++;
    return newUser
}

export const getUsersService = async (): Promise<IUser[]> => {
    const allUsers: IUser[] = users
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise<IUser[] | null> => {
    try {
        // const foundUser: IUser | undefined = users.find(user => user.id === id)
        // if(!foundUser) throw Error ('No se encontro ningun usuario con ese id')
        // return foundUser;
        // Busca el usuario por su ID en la base de datos
        const user = await getUserByIdService(id)
        
        // Devuelve el usuario encontrado o null si no existe
        return user;
    } catch (error) {
        // Si ocurre un error, lóguelo y maneje de manera apropiada
        console.error('Error al obtener usuario por ID en el servicio:', error);
        throw new Error('Error al obtener usuario por ID en el servicio');
    }
};

export const deleteUserService = async(id: number) : Promise<void> => {
    users = users.filter((user: IUser) => {
    return user.id !== id
})
}


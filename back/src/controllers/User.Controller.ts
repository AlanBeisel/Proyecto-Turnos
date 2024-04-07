import { Request, Response } from "express"
import { createUserService, getUsersService, deleteUserService, getUserByIdService } from "../services/userService"
import { createCredentialService } from "../services/credentialService";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credentials";


export const createUser = async(req:Request, res: Response) => {
    const {name, email, brithdate, nDni, username, password, userId } = req.body;
    const newUser: User = await createUserService({name, email, brithdate, nDni})
    const newCredential: Credential = await createCredentialService({username, password, userId})
    const resp= {newUser, newCredential}
    res.status(201).json(resp)
}

export const getAllUsers = async (req:Request, res: Response) => {
    try {
    const users: User[] = await getUsersService()
    res.status(200).json(users)
    }catch (error) {
        console.error('Erro al obtener el listado de usuarios', error);
        res.status(500).json({error: 'Hubo un error'})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: User | null = await getUserByIdService(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    }catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({error: 'Hubo un error al obtener usuario por ID'});
    }
};





export const deleteUser = async(req:Request, res: Response) => {
    const {id} = req.body
    await deleteUserService(id)
    res.status(200).json({message: "Eliminado correctamente"})
}
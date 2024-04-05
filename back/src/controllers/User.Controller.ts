import { Request, Response } from "express"
import { createUserService, getUsersService, deleteUserService, getUserByIdService } from "../services/userService"
import IUser from "../interfaces/IUsers";
import ICredential from "../interfaces/ICredential";
import { createCredentialService } from "../services/credentialService";


export const createUser = async(req:Request, res: Response) => {
    const {name, email, brithdate, nDni, credentialsId, username, password } = req.body;
    const newUser: IUser = await createUserService({name, email, brithdate, nDni, credentialsId })
    const newCredential: ICredential = await createCredentialService({username, password})
    const resp= {newUser, newCredential}
    res.status(201).json(resp)
}

export const getAllUsers = async (req:Request, res: Response) => {
    try {
    const users: IUser[] = await getUsersService()
    res.status(200).json(users)
    }catch (error) {
        console.error('Erro al obtener el listado de usuarios', error);
        res.status(500).json({error: 'Hubo un error'})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(parseInt(id));
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
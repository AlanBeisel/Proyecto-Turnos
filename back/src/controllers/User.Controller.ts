import { Request, Response } from "express"
import { createUserService, getUsersService, getUserByIdService, loginUserService } from "../services/userService"
import { createCredentialService } from "../services/credentialService";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credentials";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, brithdate, nDni, username, password } = req.body;

        const newUser = await createUserService({ name, email, brithdate, nDni, username, password });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Hubo un error al crear usuario' });
    }
};

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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { login, user } = await loginUserService(username, password);
        if (login) {
            res.status(200).json({ login, user });
        } else {
            res.status(400).json({ login, error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión en el controlador:', error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
    }
};


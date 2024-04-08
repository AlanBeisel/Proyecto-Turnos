import { Request, Response } from "express"
import { createUserService, getUsersService, getUserByIdService } from "../services/userService"
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

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { username, password } = req.body;
//         const result = await loginUserService(username, password);

//         if (result.login) {
//             res.status(200).json({
//                 login: true,
//                 user: result.user
//             });
//         } else {
//             res.status(400).json({
//                 login: false,
//                 message: 'Credenciales incorrectas'
//             });
//         }
//     } catch (error) {
//         console.error('Error al iniciar sesión:', error);
//         res.status(500).json({
//             login: false,
//             message: 'Hubo un error al iniciar sesión'
//         });
//     }
// };

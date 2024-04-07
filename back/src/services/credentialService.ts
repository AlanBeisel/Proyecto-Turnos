import { Credential } from "../entities/Credentials";
import {id} from "./userService"
import ICredentialDto from "../dto/CredentialDto";
import { CredentialModel, UserModel } from "../config/data-source";

export const createCredentialService = async (credential: ICredentialDto): Promise<Credential> => {
    const newCredential = await CredentialModel.create(credential);
    await CredentialModel.save(newCredential)
    const user = await UserModel.findOneBy({id: credential.userId})
    if (user) { 
        user.credential= newCredential
    await UserModel.save(user)
    }else {
        throw Error ("usuario inexistente")
    }
    return newCredential;
}









// export const credential: ICredential[]=[]
// export const createCredentialService = async (credentialDato: ICredentialDto): Promise<ICredential> => {
//     const newCredential:ICredential = {
//         id: id - 1,
//         username:credentialDato.username,
//         password:credentialDato.password
//     }
//     credential.push(newCredential)
//     return newCredential;
// }
// export const credentialService = async (params: ICredentialDto) => {
//     const {username, password} = params;
//     const foundCredentials= credential.find(
//         (credential) => credential.username === username && credential.password == password
//     )
//     if(foundCredentials && foundCredentials.username === username && foundCredentials.password === password) {
//         return foundCredentials.id
//     } else {
//         throw Error("Credential incorrect")
//     }
        
// }
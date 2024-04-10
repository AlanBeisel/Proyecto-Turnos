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



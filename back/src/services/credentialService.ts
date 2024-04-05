import ICredential from "../interfaces/ICredential";
import ICredentialDto from "../dto/CredentialDto";
import {id} from "./userService"


export const credential: ICredential[]=[]
export const createCredentialService = async (credentialDato: ICredentialDto): Promise<ICredential> => {
    const newCredential:ICredential = {
        id: id - 1,
        username:credentialDato.username,
        password:credentialDato.password
    }
    credential.push(newCredential)
    return newCredential;
}
export const credentialService = async (params: ICredentialDto) => {
    const {username, password} = params;
    const foundCredentials= credential.find(
        (credential) => credential.username === username && credential.password == password
    )
    if(foundCredentials && foundCredentials.username === username && foundCredentials.password === password) {
        return foundCredentials.id
    } else {
        throw Error("Credential incorrect")
    }
        
}
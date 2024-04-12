import { Credential } from "../entities/Credentials";
import ICredentialDto from "../dto/CredentialDto";
import { CredentialModel, UserModel } from "../config/data-source";

export const createCredentialService = async (username: string, password: string): Promise<Credential> => {
    try {
        const newCredential = await CredentialModel.create({ username, password });
        await CredentialModel.save(newCredential);
        return newCredential;
    } catch (error) {
        throw new Error("Error al crear la credencial: " );
    }
}
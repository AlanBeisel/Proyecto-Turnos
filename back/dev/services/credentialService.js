"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredentialService = void 0;
const data_source_1 = require("../config/data-source");
const createCredentialService = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = yield data_source_1.CredentialModel.create(credential);
    yield data_source_1.CredentialModel.save(newCredential);
    const user = yield data_source_1.UserModel.findOneBy({ id: credential.userId });
    if (user) {
        user.credential = newCredential;
        yield data_source_1.UserModel.save(user);
    }
    else {
        throw Error("usuario inexistente");
    }
    return newCredential;
});
exports.createCredentialService = createCredentialService;
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

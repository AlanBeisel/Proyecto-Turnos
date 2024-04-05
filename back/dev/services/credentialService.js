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
exports.credentialService = exports.createCredentialService = exports.credential = void 0;
const userService_1 = require("./userService");
exports.credential = [];
const createCredentialService = (credentialDato) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = {
        id: userService_1.id - 1,
        username: credentialDato.username,
        password: credentialDato.username
    };
    exports.credential.push(newCredential);
    return newCredential;
});
exports.createCredentialService = createCredentialService;
const credentialService = () => __awaiter(void 0, void 0, void 0, function* () {
    return exports.credential;
});
exports.credentialService = credentialService;

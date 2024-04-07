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
exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, brithdate, nDni, username, password, userId } = req.body;
    const newUser = yield (0, userService_1.createUserService)({ name, email, brithdate, nDni });
    const newCredential = yield (0, credentialService_1.createCredentialService)({ username, password, userId });
    const resp = { newUser, newCredential };
    res.status(201).json(resp);
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Erro al obtener el listado de usuarios', error);
        res.status(500).json({ error: 'Hubo un error' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener usuario por ID' });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, userService_1.deleteUserService)(id);
    res.status(200).json({ message: "Eliminado correctamente" });
});
exports.deleteUser = deleteUser;

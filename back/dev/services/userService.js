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
exports.deleteUserService = exports.getUserByIdService = exports.getUsersService = exports.createUserService = exports.id = void 0;
let users = [];
exports.id = 1;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        id: exports.id,
        name: userData.name,
        email: userData.email,
        brithdate: userData.brithdate,
        nDni: userData.nDni,
        credentialsId: userData.credentialsId
    };
    users.push(newUser);
    exports.id++;
    return newUser;
});
exports.createUserService = createUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca el usuario por su ID en la base de datos
        const user = yield (0, exports.getUserByIdService)(id);
        // Devuelve el usuario encontrado o null si no existe
        return user;
    }
    catch (error) {
        // Si ocurre un error, lóguelo y maneje de manera apropiada
        console.error('Error al obtener usuario por ID en el servicio:', error);
        throw new Error('Error al obtener usuario por ID en el servicio');
    }
});
exports.getUserByIdService = getUserByIdService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    users = users.filter((user) => {
        return user.id !== id;
    });
});
exports.deleteUserService = deleteUserService;

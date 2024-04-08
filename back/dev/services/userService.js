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
exports.getUserByIdService = exports.getUsersService = exports.createUserService = exports.id = void 0;
const data_source_1 = require("../config/data-source");
let users = [];
exports.id = 1;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield data_source_1.UserModel.create(userData);
    const result = yield data_source_1.UserModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.UserModel.find({
        relations: {
            appointments: true
        }
    });
    return allUsers;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({ where: {
            id
        }, relations: {
            appointments: true
        } });
    return user;
});
exports.getUserByIdService = getUserByIdService;
// export const loginUserService = async (username: string, password: string): Promise<{ login: boolean, user?: User }> => {
//     try {
//         // Buscar el usuario por su nombre de usuario
//         const user = await UserModel.findOne(username);
//         // Verificar si el usuario existe y la contraseña coincide
//         if (user && user.password === password) {
//             return { login: true, user };
//         } else {
//             return { login: false };
//         }
//     } catch (error) {
//         console.error('Error al iniciar sesión en el servicio:', error);
//         throw new Error('Hubo un error al iniciar sesión en el servicio.');
//     }
// };

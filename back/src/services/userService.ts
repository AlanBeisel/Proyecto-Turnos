import { Request, Response } from "express";
import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUsers"
import {UserModel } from "../config/data-source";
import { User } from "../entities/Users";

let users: IUser[] = []

export let id: number = 1;

export const createUserService = async(userData: UserDto) => {
    const newUser = await UserModel.create(userData)
    const result = await UserModel.save(newUser);
    return newUser
}

export const getUsersService = async (): Promise<User[]> => {
    const allUsers = await UserModel.find({
        relations: {
            appointments: true
        }
    });
    
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
        const user = await UserModel.findOneBy({id})
        return user;
};

export const deleteUserService = async(id: number) : Promise<void> => {
    users = users.filter((user: IUser) => {
    return user.id !== id
})
}


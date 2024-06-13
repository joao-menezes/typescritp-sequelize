import { Request, Response } from 'express';
import UserModel from "../models/user-model";
import {UserInterface} from "../interface/User.interface";
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: UserInterface[] = await UserModel.findAll();
        if (!users.length) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }

        res.json({Users: users})
    } catch (error) {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const user: UserModel | null = await UserModel.findOne({ where: { userId } });

        if (!user) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);

        return res.status(HttpCodes.OK).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
};

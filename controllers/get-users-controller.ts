import { Request, Response } from 'express';
import User from "../models/user";
import {UserInterface} from "../interface/User.interface";
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: UserInterface[] = await User.findAll();
        if (!users.length) {
            return res.status(HttpCodes.BAD_REQUEST).json({
                code: HttpCodes.BAD_REQUEST,
                message:"Users not found",
            });
        }

        res.json(users)
    } catch (error) {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);
        }

        return res.status(HttpCodes.OK).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

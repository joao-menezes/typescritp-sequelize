import { Request, Response } from 'express';
import UserModel from '../models/user-model';
import HttpCodes from 'http-status-codes';
import * as validator from 'validator';
import userModel from "../models/user-model";
import {SharedErrors} from "../shared/errors/shared-errors";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {name, email} = req.body;
        const user: UserModel | null = await UserModel.findByPk(userId);

        if (!name || !email) return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidEmailOrNameFormat);

        if (!validator.isEmail(email)) return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidEmailFormat);

        if (!user) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);

        user.name = name;
        user.email = email;
        const userUpdated: userModel = await user.save();

        res.status(HttpCodes.OK).json({
            code: HttpCodes.OK,
            userUpdated
        });
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
};

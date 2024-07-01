import { Request, Response } from 'express';
import UserModel from '../models/user-model';
import HttpCodes from 'http-status-codes';
import * as validator from 'validator';
import {SharedErrors} from "../shared/errors/shared-errors";
import logger from "../logger";

const _fileName = module.filename.split("/").pop();

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name, email } = req.body;
        const user: UserModel | null = await UserModel.findByPk(userId);

        if (!name) return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidNameFormat);

        if (!email || !validator.isEmail(email)) return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidEmailFormat);

        if (!user) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.UserNotFound);

        user.name = name;
        user.email = email;
        const userUpdated: UserModel = await user.save();

        res.status(HttpCodes.OK).json({
            code: HttpCodes.OK,
            userUpdated
        });

        logger.info(`User updated with successfully: ${JSON.stringify(userUpdated)} - ${_fileName}`);
    } catch (error) {
        logger.error(`Error updating user: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
};

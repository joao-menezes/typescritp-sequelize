import { Request, Response } from "express";
import UserModel from "../models/user-model";
import { UserInterface } from "../interface/User.interface";
import HttpCodes from "http-status-codes";
import * as validator from "validator";
import { SharedErrors } from "../shared/errors/shared-errors";
import logger from "../logger";

const _fileName = module.filename.split("/").pop();

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email} = req.body;

        if (!name) {
            return res.status(HttpCodes.BAD_REQUEST).json({ error: SharedErrors.InvalidNameFormat });
        }

        if (!email || !validator.isEmail(email)) {
            return res.status(HttpCodes.BAD_REQUEST).json({ error: SharedErrors.InvalidEmailFormat });
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(HttpCodes.CONFLICT).json({ error: SharedErrors.EmailAlreadyExists });
        }

        const userCreated: UserInterface = await UserModel.create({ name, email });
        res.status(HttpCodes.CREATED).json({
            code: HttpCodes.CREATED,
            userCreated
        });
        logger.info(`User created successfully - ${_fileName}`);
    } catch (error) {
        logger.error(`Error creating user: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ error: SharedErrors.InternalServerError });
    }
};

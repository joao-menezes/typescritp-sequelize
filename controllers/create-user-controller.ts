import {Request, Response} from "express";
import UserModel from "../models/user-model";
import {UserInterface} from "../interface/User.interface";
import HttpCodes from "http-status-codes";
import * as validator from "validator";
import {SharedErrors} from "../shared/errors/shared-errors";

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email} = req.body;

        if (!name || !email) {
            return res.status(HttpCodes.BAD_REQUEST).json({message: "Name and email address is required"});
        }

        if(!validator.isEmail(email)){
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.InvalidEmailFormat);
        }

        const userCreated: UserInterface = await UserModel.create({name, email});
        res.status(HttpCodes.CREATED).json({
            code: HttpCodes.CREATED,
            userCreated
        });
    } catch (error) {
        console.error(`Error creating user: ${error}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error'
        });
    }
};

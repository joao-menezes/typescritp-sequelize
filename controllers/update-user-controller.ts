import { Request, Response } from 'express';
import User from '../models/user';
import HttpCodes from 'http-status-codes';
import * as validator from 'validator';

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {name, email} = req.body;
        const user: User | null = await User.findByPk(userId);

        if (!name || !email) {
            return res.status(HttpCodes.BAD_REQUEST).json({message: "User ID, name, and email address are required"});
        }

        if (!validator.isEmail(email)) {
            return res.status(HttpCodes.BAD_REQUEST).json({message: "Invalid email format"});
        }

        if (!user) {
            return res.status(HttpCodes.NOT_FOUND).json({message: "User not found"});
        }

        user.name = name;
        user.email = email;
        const userUpdated = await user.save();

        res.status(HttpCodes.OK).json({
            code: HttpCodes.OK,
            userUpdated
        });
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error'
        });
    }
};

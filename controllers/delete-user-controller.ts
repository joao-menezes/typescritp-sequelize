import { Request, Response } from 'express';
import UserModel from "../models/user-model";
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        console.log("Deleting user with ID:", userId);

        const usersDeleted: number = await UserModel.destroy({
            where: {userId: userId}
        });

        if (usersDeleted === 0) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }

        res.json({
            code: HttpCodes.OK,
            message: `UserID ${userId} deleted successfully`,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
}

import { Request, Response } from 'express';
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";
import ImageModel from "../models/image-model";

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        console.log("Deleting user with ID:", userId);

        const imageDeleted: number = await ImageModel.destroy({
            where: {imageId: userId}
        });

        if (imageDeleted === 0) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }

        res.json({
            code: HttpCodes.OK,
            message: `ImageID ${userId} deleted successfully`,
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
}

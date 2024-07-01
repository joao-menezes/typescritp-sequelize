import { Request, Response } from 'express';
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";
import ImageModel from "../models/image-model";
import logger from "../logger";

const _fileName = module.filename.split("/").pop();

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const imageId = req.params.imageId;
        console.log("Deleting user with ID:", imageId);

        const imageDeleted: number = await ImageModel.destroy({
            where: {imageId: imageId}
        });

        if (imageDeleted === 0) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.UserNotFound);
        }

        res.json({
            code: HttpCodes.OK,
            message: `ImageID ${imageId} deleted successfully`,
        });
        logger.info(`Deleting image ID: ${imageId} deleted successfully - ${_fileName}`);
    } catch (error) {
        logger.error(`Error deleting image: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
}

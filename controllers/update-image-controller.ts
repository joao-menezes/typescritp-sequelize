import { Request, Response } from 'express';
import HttpCodes from 'http-status-codes';
import ImageModel from "../models/image-model";
import imageModel from "../models/image-model";
import {SharedErrors} from "../shared/errors/shared-errors";
import logger from "../logger";

const _fileName = module.filename.split("/").pop();

export const updateImage = async (req: Request, res: Response) => {
    try {
        const {imageId} = req.params;
        const image: ImageModel | null = await ImageModel.findByPk(imageId);

        if (!image) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.ImageNotFound);

        const imageUpdated: imageModel = await image.save();

        res.status(HttpCodes.OK).json({
            code: HttpCodes.OK,
            imageUpdated
        });
        logger.info(`Image updated with successfully - ${_fileName}`);
    } catch (error) {
        logger.error(`Error updating image: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
};

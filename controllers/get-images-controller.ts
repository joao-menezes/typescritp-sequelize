import {Request, Response} from 'express';
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";
import {ImageInterface} from "../interface/Image.interface";
import logger from "../logger";
import ImageModel from "../models/image-model";
import {Op} from "sequelize";
const _fileName = module.filename.split("/").pop();

export const getImages = async (req: Request, res: Response) => {
    try {
        const images: ImageInterface[] = await ImageModel.findAll();

        if (!images.length) return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.ImageNotFound);

        const imageData: (string | undefined)[] = images.map(image => image.imageId);

        logger.info(`Fetching images with successfully: ${imageData} - ${_fileName}`);
        res.set('Content-Type', 'image/jpeg');
        res.send(imageData);
    } catch (error) {
        logger.error(`Error fetch images: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const { imageId } = req.params;
        const image = await ImageModel.findByPk(imageId);

        if (!image) {
            return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.ImageNotFound);
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(image.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
    }
};

import { Request, Response } from 'express';
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";
import Image from "../models/image-model";
import {ImageInterface} from "../interface/Image.interface";

export const getImages = async (req: Request, res: Response) => {
    try {
        const images: ImageInterface[] = await Image.findAll();
        if (!images.length) {
            return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.ImageNotFound);
        }

        const imageData = images.map(image => image.data);

        res.set('Content-Type', 'image/jpeg');
        res.send(imageData);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};


export const getImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);

        if (!image) {
            return res.status(HttpCodes.NOT_FOUND).json(SharedErrors.ImageNotFound);
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(image.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.ImageNotFound);
    }
};

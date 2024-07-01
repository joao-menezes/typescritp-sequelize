import {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
import {SharedErrors} from "../shared/errors/shared-errors";
import HttpCodes from "http-status-codes";
import logger from "../logger";
import ImageModel from "../models/image-model";

const _fileName = module.filename.split("/").pop();

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) return res.status(HttpCodes.BAD_GATEWAY).json(SharedErrors.WrongFileType);

        const filePath: string = path.join(__dirname, '../uploads', req.file.filename);
        const fileData: Buffer = fs.readFileSync(filePath);

        const newImage = await ImageModel.create({
            filename: req.file.filename,
            data: fileData,
        });

        fs.unlinkSync(filePath);

        res.status(HttpCodes.CREATED).json({
            message: HttpCodes.CREATED,
            imageId: newImage.imageId,
        });
        logger.info(`Image uploaded successfully - ${_fileName}`)
    } catch (error) {
        console.error('', error);
        logger.error(`Error uploading image: ${error} - ${_fileName}`);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.ErrorUploadImage);
    }
};

import {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
import Image from '../models/image-model';
import {SharedErrors} from "../shared/errors/shared-errors";
import HttpCodes from "http-status-codes";

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) return res.status(HttpCodes.BAD_GATEWAY).json(SharedErrors.WrongFileType);

        const filePath: string = path.join(__dirname, '../uploads', req.file.filename);
        const fileData: Buffer = fs.readFileSync(filePath);

        const newImage = await Image.create({
            filename: req.file.filename,
            data: fileData,
        });

        fs.unlinkSync(filePath);

        res.status(HttpCodes.CREATED).json({
            message: HttpCodes.CREATED,
            imageId: newImage.imageId,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.ErrorUploadImage);
    }
};

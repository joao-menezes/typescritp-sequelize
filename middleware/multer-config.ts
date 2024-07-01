import multer from 'multer';
import path from 'path';
import {SharedErrors} from "../shared/errors/shared-errors";
import fs from "fs";
import logger from "../logger";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error(JSON.stringify(SharedErrors.WrongFileType)) as unknown as null, false);
    }
};

const clearFolder = (folderPath: string) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            logger.error(`Error to read folder: ${err.message}`);
            return;
        }

        let howManyFiles = files.length;
        if (howManyFiles === 0) return

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    logger.error(`Error to get file information: ${err.message}`);
                    return;
                }

                if (stats.isDirectory()) {
                    clearFolder(filePath);
                    fs.rmdir(filePath, (err) => {
                        if (err) {
                            logger.error(`Error to delete folder: ${err.message}`);
                        }
                    });
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            logger.error(`Error to delete file: ${err.message}`);
                        }
                    });
                }
            });
        }
        logger.info(`Files deleted successfully: ${howManyFiles}`);
    });
};

const folderPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

clearFolder(folderPath);


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;

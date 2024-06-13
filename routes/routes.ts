import {Router} from 'express';
import {getUser, getUsers} from "../controllers/get-users-controller";
import {createUser} from "../controllers/create-user-controller";
import {updateUser} from "../controllers/update-user-controller";
import {uploadImage} from "../controllers/create-image-controller";
import {getImage, getImages} from "../controllers/get-images-controller";
import {deleteUser} from "../controllers/delete-user-controller";
import {deleteImage} from "../controllers/delete-image-controller";
import {updateImage} from "../controllers/update-image-controller";

import upload from "../middleware/multer-config";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/create-user', createUser);
router.put('/update-user/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/image', getImages);
router.get('/image/:imageId', getImage);
router.put('/image/:imageId', updateImage);
router.delete('/image/:imageId', deleteImage);

router.get('/health-check', (req, res) => {res.send('healthy');});

export default router;

import {Router} from 'express';
import {getUser, getUsers} from "../controllers/get-users-controller";
import {createUser} from "../controllers/create-user-controller";
import {updateUser} from "../controllers/update-user-controller";
import {uploadImage} from "../controllers/create-image-controller";
import upload from "../middleware/multer-config";
import {getImage, getImages} from "../controllers/get-images-controller";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/create-user', createUser);
router.put('/update-user/:userId', updateUser)
router.post('/upload', upload.single('image'), uploadImage);
router.get('/image', getImages);
router.get('/image/:id', getImage);

export default router;

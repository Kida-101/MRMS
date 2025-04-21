import Router from 'express';
import { uploadImage } from '../controllers/upload.controller.js';

const uploadRouter = Router();

uploadRouter.post('/upload', uploadImage);

export default uploadRouter;

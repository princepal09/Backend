import express from 'express'
import { upload } from '../middlewares/multer.middleware.js';
import { contactController } from '../controllers/contact.controller.js';

const router = express.Router()

router.post("/contact", upload.single('file'), contactController)



export default router;
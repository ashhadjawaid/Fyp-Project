import express from 'express';
import bodyParser from 'body-parser';
import {createShelter, getAllShelter} from "../controllers/ShelterController.js"
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/createshelter', createShelter)
router.post('/find-nearest-shelter', createShelter)
router.get('/get-all-shelter',  getAllShelter)



export default router
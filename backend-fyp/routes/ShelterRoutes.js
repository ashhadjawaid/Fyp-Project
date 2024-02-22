import express from 'express';
import bodyParser from 'body-parser';
import shelterController from "../controllers/ShelterController.js"

const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/createshelter', shelterController)
router.post('/find-nearest-shelter', shelterController)



export default router
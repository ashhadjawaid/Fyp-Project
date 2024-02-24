import express from "express";
<<<<<<< HEAD
import {deleteAdoption,getAll, getadoptionById, postAdoption} from '../controllers/adoptionController.js'
=======
import {deleteAdoption,getAll, postAdoption,} from '../controllers/adoptionController.js'
>>>>>>> fc59c8810a6db8cada1bb8fcf7eea9c9128d13b7

const router = express.Router();

//get all media
router.get("/all", getAll);
router.post("/create-adoption", postAdoption);
router.get('/all/:id',  getadoptionById)

export default router;

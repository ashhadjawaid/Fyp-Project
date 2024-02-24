import express from "express";
import {deleteAdoption,getAll, getadoptionById, postAdoption} from '../controllers/adoptionController.js'

const router = express.Router();

//get all media
router.get("/all", getAll);
router.post("/create-adoption", postAdoption);
router.get('/all/:id',  getadoptionById)

export default router;

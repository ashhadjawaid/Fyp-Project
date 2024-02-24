import express from "express";
import {deleteAdoption,getAll, postAdoption,} from '../controllers/adoptionController.js'

const router = express.Router();

//get all media
router.get("/all", getAll);
router.post("/create-adoption", postAdoption);

export default router;

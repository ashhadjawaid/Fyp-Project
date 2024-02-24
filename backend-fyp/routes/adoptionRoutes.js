import express from "express";
<<<<<<< HEAD
import {deleteAdoption,getAll, getadoptionById, postAdoption} from '../controllers/adoptionController.js'
=======

import {deleteAdoption,getAll, getadoptionById, postAdoption} from '../controllers/adoptionController.js'

// import {deleteAdoption,getAll, postAdoption,} from '../controllers/adoptionController.js'

>>>>>>> 7923a244d441923f64a6e139f47042e8092c0dc5

const router = express.Router();

//get all media
router.get("/all", getAll);
router.post("/create-adoption", postAdoption);
router.get('/all/:id',  getadoptionById)

export default router;

import express from 'express';
import RescueAnimal from "../models/rescueAnimalSchema.js";
import Shelter from '../models/ShelterSchema.js';

const router = express.Router();

router.post('/send-to-shelter/:requestId', async (req, res, next) => {
    try {
        const { shelterId } = req.body;
        const { requestId } = req.params;

        // Check if the shelterId is provided
        if (!shelterId) {
            return res.status(400).json({ success: false, message: 'Shelter ID is required.' });
        }

        // Check if the shelter exists
        const shelter = await Shelter.findById(shelterId);
        if (!shelter) {
            return res.status(404).json({ success: false, message: 'Shelter not found.' });
        }

        // Find the rescue animal request by ID
        const request = await RescueAnimal.findById(requestId);
        if (!request) {
            return res.status(404).json({ success: false, message: 'Rescue animal request not found.' });
        }

        // Associate the request with the selected shelter
        request.shelterId = shelterId;
        await request.save();

        res.status(200).json({ success: true, message: 'Rescue animal request sent to the specified shelter.' });
    } catch (error) {
        next(error);
    }
});

export default router;

import express from "express";
import RescueAnimal from "../models/rescueAnimalSchema.js";
import Shelter from '../models/ShelterSchema.js';
// import { isAdmin } from '../middlewares/adminMiddleware.js';
import { getAllUser, getAllRescueRequest } from "../controllers/adminController.js"

const router = express.Router();

router.get('/users', getAllUser)
// router.get('/users/delete/:id', isAdmin, deleteUser)
router.get("/getAllRescueRequest", getAllRescueRequest);

// Endpoint to send a rescue animal request to a specific shelter
router.post('/send-to-shelter/:requestId', async (req, res, next) => {
    try {
        const { shelterId } = req.body;
        const { requestId } = req.params;

        // Check if shelterId is provided
        if (!shelterId) {
            return res.status(400).json({ success: false, message: 'Shelter ID is required.' });
        }

        // Find the shelter by ID
        const shelter = await Shelter.findById(shelterId);
        if (!shelter) {
            return res.status(404).json({ success: false, message: 'Shelter not found.' });
        }

        // Find the rescue request by ID
        const rescueRequest = await RescueAnimal.findById(requestId);
        if (!rescueRequest) {
            return res.status(404).json({ success: false, message: 'Rescue animal request not found.' });
        }

        // Associate the request with the selected shelter
        rescueRequest.shelterId = shelterId;
        await rescueRequest.save();

        // Increment the request count in the shelter schema
        shelter.requestCount += 1;

        // Add the request details to the requests array
        shelter.requests.push({
            requestId: requestId,
            requestInfo: rescueRequest.toObject() // Convert rescue request to plain JavaScript object
        });

        await shelter.save();

        res.status(200).json({ success: true, message: 'Rescue animal request sent to the specified shelter.' });
    } catch (error) {
        console.error('Error sending rescue request to shelter:', error);
        next(error);
    }
});

// Retrieve rescue request details by ID
router.get('/rescue-requests/:requestId', async (req, res, next) => {
    try {
        const { requestId } = req.params;

        // Find the rescue request by ID
        const rescueRequest = await RescueAnimal.findById(requestId);

        // Check if the rescue request exists
        if (!rescueRequest) {
            return res.status(404).json({ success: false, message: 'Rescue animal request not found.' });
        }

        // Return the details of the rescue request
        res.status(200).json({ success: true, rescueRequest });
    } catch (error) {
        console.error('Error fetching rescue request details:', error);
        next(error);
    }
});

export default router;

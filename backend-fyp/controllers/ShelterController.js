import Shelter from "../models/ShelterSchema.js";

export const createShelter = async (req, res) => {
    try {
        // Check if shelter with provided _id exists
        const existingShelterData = await Shelter.findOne({ _id: req.body.shelter_id }); 

        if (existingShelterData) {
            return res.status(404).send({ success: false, msg: "Shelter already exists" });
        }

        // Check if latitude or longitude is missing
        if (!req.body.latitude || !req.body.longitude) {
            return res.status(400).send({ success: false, msg: "Latitude and longitude are required for location" });
        }

        const shelter = new Shelter({
            name: req.body.name,
            shelterName: req.body.shelterName, 
            email: req.body.email, 
            address: req.body.address,
            currentLocation: {
                type: "Point",
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            }
        });

        const storedData = await shelter.save();
        res.status(200).send({ success: true, msg: "Shelter created successfully", data: storedData });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
};

export const getAllShelter = async (req, res) => {
    try {
        const shelters = await Shelter.find()
        console.log(shelters);
        if (!shelters || shelters.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Shelter not found",
            });
        }
        return res.status(200).json({
            success: true,
            shelters,
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "error in Shelter Controller",
        });
    }
}

export const getShelterById = async (req, res) => {
    try {
        const { shelterId } = req.params;
        const shelter = await Shelter.findById(shelterId);
        if (!shelter) {
            return res.status(404).json({ success: false, message: 'Shelter not found.' });
        }
        res.status(200).json({ success: true, shelter });
    } catch (error) {
        console.error('Error fetching shelter by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

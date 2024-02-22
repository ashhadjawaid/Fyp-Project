import Shelter from "../models/ShelterSchema.js";

export const createShelter = async (req, res) => {
    try {
        // Check if shelter with provided _id exists
        const existingShelterData = await Shelter.findOne({ _id: req.body.shelter_id }); // Corrected field name to shelter_id

        if (existingShelterData) {
            return res.status(404).send({ success: false, msg: "Shelter already exists" });
        }

        // Check if latitude or longitude is missing
        if (!req.body.latitude || !req.body.longitude) {
            return res.status(400).send({ success: false, msg: "Latitude and longitude are required for location" });
        }

        const shelter = new Shelter({
            name: req.body.name,
            shelterName: req.body.shelterName, // Corrected field name to shelterName
            email: req.body.email, // Corrected field name to email
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

export default createShelter

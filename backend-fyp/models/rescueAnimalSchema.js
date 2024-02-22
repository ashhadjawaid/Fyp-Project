import mongoose from 'mongoose';

const rescueAnimalSchema = new mongoose.Schema({
  // Animal Description
  animalSpecie: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'other'],
  },
  animalBreed: {
    type: String,
    required: false,
  },
  animalSize: {
    type: String,
    required: true,
  },
  // Animal Condition
  petCondition: {
    type: String,
    enum: ['injured', 'sick', 'tangled', 'other'],
  },
  // Animal Location
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: Number,
  },
  // New Fields for Latitude and Longitude
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'], // Ensure type is 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers
      required: true,
    },
  },
  addInfoAnimal: {
    type: String,
  },
  addInfoLocation: {
    type: String,
  },
  // Applicant Name
  applicantName: {
    type: String,
    required: true,
  },
  applicantPhone: {
    type: Number,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  animalPicture: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

// Create a 2dsphere index for the 'currentLocation' field
rescueAnimalSchema.index({ currentLocation: '2dsphere' });

const RescueAnimal = mongoose.model('RescueAnimal1', rescueAnimalSchema);

export default RescueAnimal;

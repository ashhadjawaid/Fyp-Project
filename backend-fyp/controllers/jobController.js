import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import RescueAnimal from "../models/rescueAnimalSchema.js";
import cloudinary from "cloudinary";

// Get ALL Rescue Request

export const getAllRescueRequest = catchAsyncErrors(async (req, res, next) => {
  const rescueAnimal = await RescueAnimal.find({ expired: false });
  res.status(200).json({
    success: true,
    rescueAnimal,
  });
});


export const postRescueAnimal = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler('Animal Picture Required!', 400));
    }

    const { animalPicture } = req.files;
    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedFormats.includes(animalPicture.mimetype)) {
      return next(new ErrorHandler('Invalid file type. Please upload a PNG, JPEG, or WebP file.', 400));
    }

    // Upload animal picture to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(animalPicture.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error('Cloudinary Error:', cloudinaryResponse.error || 'Unknown Cloudinary error');
      return next(new ErrorHandler('Failed to upload Animal Picture to Cloudinary', 500));
    }

    const {
      animalSpecie,
      animalBreed,
      animalSize,
      petCondition,
      country,
      address,
      city,
      zip,
      addInfoAnimal,
      addInfoLocation,
      applicantName,
      applicantPhone,
      applicantEmail,
      latitude,
      longitude
    } = req.body;

    // Validate required fields
    if (!applicantName || !applicantEmail || !animalSpecie || !address || !city || !animalSize || !petCondition) {
      return next(new ErrorHandler('Please provide all required details about the Animal.', 400));
    }

    // Ensure latitude and longitude are parsed as numbers
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      console.error('Invalid latitude or longitude values:', latitude, longitude);
      return next(new ErrorHandler('Invalid latitude or longitude values.', 400));
    }

    // Create RescueAnimal document with all details including latitude and longitude
    const rescueAnimal = await RescueAnimal.create({
      animalSpecie,
      animalBreed,
      animalSize,
      petCondition,
      country,
      address,
      city,
      zip,
      addInfoAnimal,
      addInfoLocation,
      applicantName,
      applicantPhone,
      applicantEmail,
      currentLocation: {
        type: 'Point',
        coordinates: [parsedLongitude, parsedLatitude]
      },
      animalPicture: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Animal Details Added Successfully in Database!',
      rescueAnimal,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllrescueById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log("kiya msla hai", id)
  try {
    const rescueAnimal = await RescueAnimal.findById(id);
    console.log("kiya msla hai", rescueAnimal)
    if (!rescueAnimal) {
      return next(new ErrorHandler("Rescue Expired", 404));
    }
    res.status(200).json({
      success: true,
      rescueAnimal,
    });
    console.log("kiya msla hai", rescueAnimal)
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});

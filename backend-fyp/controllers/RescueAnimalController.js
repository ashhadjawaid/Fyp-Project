import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import RescueAnimal from "../models/rescueAnimalSchema.js";
import cloudinary from "cloudinary";



export const postRescueAnimal = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === 'Employer') {
      return next(
        new ErrorHandler('Employers are not allowed to access this resource.', 400)
      );
    }
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler('Animal Picture Required!', 400));
    }
  
    const { animalPicture } = req.files;
    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedFormats.includes(animalPicture.mimetype)) {
      return next(
        new ErrorHandler('Invalid file type. Please upload a PNG, JPEG, or WebP file.', 400)
      );
    }
  
    // Upload animal picture to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      animalPicture.tempFilePath
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        'Cloudinary Error:',
        cloudinaryResponse.error || 'Unknown Cloudinary error'
      );
      return next(new ErrorHandler('Failed to upload Animal Picture to Cloudinary', 500));
    }
  
    const {
      animalSpecie,
      animalBreed,
      animalSize,
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
      longitude // Adding latitude and longitude fields
    } = req.body;
  
    // Validate required fields
    if (!applicantName || !applicantEmail || !animalSpecie || !address || !city || !animalSize || !animalBreed || !latitude || !longitude) {
      return next(new ErrorHandler('Please provide all required details about the Animal.', 400));
    }
  
    const postedBy = req.user._id;
  
    // Create RescueAnimal document with all details including latitude and longitude
    const rescueAnimal = await RescueAnimal.create({
      animalSpecie,
      animalBreed,
      animalSize,
      country,
      address,
      city,
      zip,
      addInfoAnimal,
      addInfoLocation,
      applicantName,
      applicantPhone,
      applicantEmail,
      latitude, // Storing latitude
      longitude, // Storing longitude
      postedBy,
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
  });
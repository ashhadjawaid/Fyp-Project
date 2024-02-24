import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import {Adoption} from"../models/Adoption.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

export const getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find();

    res.json(adoptions);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const postAdoption = catchAsyncErrors(async(req, res, next) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Picture to Cloudinary", 500));
  }
  const {
    petName,
    petBio,
    petBreed,
    age,
    status,
    weight,
    height,
    hypoallegenic,
    city,
    address,
    adoptionPicture,
    
  } = req.body;

  if (!petName || !petBio || !petBreed || !age || !status || !weight || !height || !city || !address  ) {
    return next(new ErrorHandler("Please provide full details About Animal.", 400));
  }
  try {
    const adoption = await Adoption.create({
      petName,
      petBio,
      petBreed,
      age,
      status,
      weight,
      height,
      city,
      address,
      adoptionPicture: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Animal added to Adoption successfully!",
      adoption,
    });
  } catch (error) {
    return next(new ErrorHandler("Error in adding the animal to Adoption.", 500));
  }
});

export const getadoptionById =async (req,res)=>{
  const { id } = req.params;
  console.log("kiya msla hai", id)
  try {
    const adoptPet = await Adoption.findById(id);
    console.log("kiya msla hai", adoptPet)
    if (!adoptPet) {
      return next(new ErrorHandler("Adoption Expired", 404));
    }
    res.status(200).json({
      success: true,
      adoptPet,
    });
    console.log("kiya msla hai", adoptPet)
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
}
export const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Adoption.findByIdAndRemove(id);

    res.json({ message: "Adoption succesfuly delete", deleted });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

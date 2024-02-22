import { User } from "../models/userSchema.js";
import  RescueAnimal from "../models/rescueAnimalSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({},{password:0})
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        return  res.status(200).json({
            success: true,
            users,
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "error in adminController",
        });
    }
}

// Get ALL Rescue Request

export const getAllRescueRequest = catchAsyncErrors(async (req, res) => {
    try {
        const rescueAnimal = await RescueAnimal.find();
        console.log("kiya msla hai", rescueAnimal)
        if (!rescueAnimal || rescueAnimal.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Yaayy. no Injured Animal found",
            });
        }
        res.status(200).json({
            success: true,
            rescueAnimal,
          });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "error in getAllRescueRequest Controller",
        });
    }
   
 
  });
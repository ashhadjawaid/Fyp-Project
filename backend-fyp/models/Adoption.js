import mongoose from "mongoose";

const AdoptionSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    petBio: {
      type: String,
      required: true,
    },
    petBreed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Available',
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    hypoallegenic: {
      type: Boolean,
      required: true,
      default: false,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    adoptionPicture: {
      public_id: {
        type: String, 
        
      },
      url: {
        type: String, 
       
      },
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Shelter",
    },
  },
  {
    timestamps: true,
  }
);

export const Adoption = mongoose.model("Adoption", AdoptionSchema);

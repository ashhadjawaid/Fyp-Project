import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { MdUploadFile } from "react-icons/md";
import { MdCircle } from "react-icons/md";

const AdoptionForm = () => {
  const [animalPicture, setAnimalPicture] = useState(null);
  const [adoptpet, setadoptpet] = useState({
    petName: "",
    petBio: "",
    petBreed: "",
    age: "",
    status: "",
    weight: "",
    height: "",
    hypoallegenic: "",
    city: "",
    address: ""
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setadoptpet({
      ...adoptpet,
      [name]: value,
    });
  }
  const handleFileChange = (event) => {
    const animalPicture = event.target.files[0];
    setAnimalPicture(animalPicture);
  };

  const handlePostAdoption = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formData = new FormData();

      // Append text data
      for (const key in adoptpet) {
        formData.append(key, adoptpet[key]);
      }

      // Append file data
      formData.append('animalPicture', animalPicture);

      // Send form data to backend
      const response = await axios.post('http://localhost:4000/api/v1/adoption/create-adoption', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${authToken}`
        }
      });

      console.log("Response:", response);

      toast.success(response.data.message);

      // Reset form after successful submission
      resetForm();

    } catch (error) {
      console.error("Error in submitting data from frontend:", error.message);
      toast.error("Error in submitting data. Please try again.");
    }
  };

  const resetForm = () => {
    setRescueAnimal({
      petName: "",
      petBio: "",
      petBreed: "",
      age: "",
      status: "",
      weight: "",
      height: "",
      hypoallegenic: "",
      city: "",
      address: ""
    });
    setAnimalPicture(null);
  };
  return (


    <div className="adoption_post page postAnimal">
      <div className="container form-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-side-left">
              <h2>Adoption Principles</h2>
              <p><MdCircle color='#f39946' /> Adopt from shelters or rescue organizations instead of buying from breeders.</p>
              <p><MdCircle color='#f39946' /> Prioritize safety for both the rescuer and the animal.</p>
              <p><MdCircle color='#f39946' /> Commit to providing love, care, and attention for the animal's lifetime.</p>
              <p><MdCircle color='#f39946' /> Schedule regular veterinary check-ups and healthcare.</p>
              <p><MdCircle color='#f39946' /> Invest time in training and socializing your adopted pet.</p>
              <p><MdCircle color='#f39946' /> Spay or neuter your adopted pet to prevent unplanned litters.</p>
              <p><MdCircle color='#f39946' />Be patient and understanding as adopted animals may need time to adjust.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <h3>POST NEW Adoption</h3>
          <form onSubmit={handlePostAdoption}>
            <input
              type="text"
              name="petName"
              placeholder="Pet Name"
              value={adoptpet.petName}
              onChange={handleInput}
            />
            <textarea
              type="text"
              name="petBio"
              placeholder="Intoduce Your Pet"
              value={adoptpet.petBio}
              onChange={handleInput}
            />
            <input
              type="text"
              name="petBreed"
              placeholder="pet Breed"
              value={adoptpet.petBreed}
              onChange={handleInput}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={adoptpet.age}
              onChange={handleInput}
            />

            <input
              type="text"
              name="status"
              placeholder="Status"
              value={adoptpet.status}
              onChange={handleInput}
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight In Kg"
              value={adoptpet.weight}
              onChange={handleInput}
            />
            <input
              type="number"
              name="height"
              placeholder="Height In Meters"
              value={adoptpet.height}
              onChange={handleInput}
            />

            <div className="upload">
              <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
                Upload Photo
              </label>
              <input
                className='upload-image'
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={adoptpet.city}
              onChange={handleInput}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={adoptpet.address}
              onChange={handleInput}
            />
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>

    </div>

  )
}

export default AdoptionForm

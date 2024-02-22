import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import "./post.css";

const PostAnimal = () => {
  const { isAuthorized, user, authToken } = useContext(Context);
  const [animalPicture, setAnimalPicture] = useState(null);


  const [rescueAnimal, setRescueAnimal] = useState({
    applicantName: "",
    applicantPhone: "",
    applicantEmail: "",
    animalSpecie: "dog",
    animalBreed: "",
    animalSize: "small",
    petCondition: "injured",
    currentLocation: {
      type: "Point",
      coordinates: [] // Initialize coordinates as an empty array
    },
    address: "",
    city: "",
    zip: "",
    addInfoAnimal: "",
    addInfoLocation: "",
    latitude: '',
    longitude: ''
  })

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const animalPicture = event.target.files[0];
    setAnimalPicture(animalPicture);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRescueAnimal({
      ...rescueAnimal,
      [name]: value,

    });
  }


  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setRescueAnimal({
          ...rescueAnimal,
          currentLocation: {
            type: "Point",
            coordinates: [longitude, latitude] // Reverse order: [longitude, latitude]
          }
        });
      }, (error) => {
        console.error("Error fetching location:", error.message);
        toast.error("Error fetching location. Please try again.");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  }
  
  // Function to handle form submission
  const handlePostAnimal = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const formData = new FormData();
  
      // Append text data
      for (const key in rescueAnimal) {
        if (key === 'currentLocation') {
          formData.append(`${key}[type]`, rescueAnimal[key].type);
          formData.append(`${key}[coordinates][0]`, rescueAnimal[key].coordinates[0]);
          formData.append(`${key}[coordinates][1]`, rescueAnimal[key].coordinates[1]);
        } else {
          formData.append(key, rescueAnimal[key]);
        }
      }
  
      // Append file data
      formData.append('animalPicture', animalPicture);
  
      // Send form data to backend
      const response = await axios.post('http://localhost:4000/api/v1/job/postRescueDetails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`
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
  
  // Function to reset form fields
  const resetForm = () => {
    setRescueAnimal({
      applicantName: "",
      applicantPhone: "",
      applicantEmail: "",
      animalSpecie: "dog",
      animalBreed: "",
      animalSize: "small",
      petCondition: "injured",
      currentLocation: {
        type: "Point",
        coordinates: [] // Reset coordinates to empty array
      },
      address: "",
      city: "",
      zip: "",
      addInfoAnimal: "",
      addInfoLocation: ""
    });
    setAnimalPicture(null);
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Job Seeker")) {
    navigateTo("/");
  }

  return (
    <div className='postAnimal'>
      <div className="container">
        <h3>Found any Animal?</h3>
        <form onSubmit={handlePostAnimal}>
          <input
            type="text"
            name="applicantName"
            placeholder="Applicant Name"
            value={rescueAnimal.applicantName}
            onChange={handleInput}
          />
          <input
            type="tel"
            name="applicantPhone"
            placeholder="Applicant Phone Number"
            value={rescueAnimal.applicantPhone}
            onChange={handleInput}
          />
          <input
            type="email"
            name="applicantEmail"
            placeholder="Applicant Email"
            value={rescueAnimal.applicantEmail}
            onChange={handleInput}
          />

          <select
            name="animalSpecie"
            value={rescueAnimal.animalSpecie}
            onChange={handleInput}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="animalBreed"
            placeholder="Animal Breed"
            value={rescueAnimal.animalBreed}
            onChange={handleInput}
          />

          <select
            name="animalSize"
            value={rescueAnimal.animalSize}
            onChange={handleInput}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
          </select>

          <select
            name="petCondition"
            value={rescueAnimal.petCondition}
            onChange={handleInput}
          >
            <option value="injured">Injured</option>
            <option value="sick">Sick</option>
            <option value="tangled">Tangled/Stuck</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={rescueAnimal.address}/>
         
          <input
            type="text"
            name="city"
            placeholder="City"
            value={rescueAnimal.city}
            onChange={handleInput}
          />
          <input
            type="number"
            name="zip"
            placeholder="Zip Code"
            value={rescueAnimal.zip}
            onChange={handleInput}
          />

          <div className="location-fetch">
            <button type="button" onClick={fetchLocation}>Fetch My Location</button>
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={rescueAnimal.currentLocation.coordinates[1] || ""}
              onChange={handleInput}
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={rescueAnimal.currentLocation.coordinates[0] || ""}
              onChange={handleInput}
            />
          </div>
          <div className="upload">
            <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
              Upload Photo
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <textarea
            type="text"
            name="addInfoAnimal"
            placeholder="Additional information about animal"
            value={rescueAnimal.addInfoAnimal}
            onChange={handleInput}
          />
          <textarea
            type="text"
            name="addInfoLocation"
            placeholder="Additional Info About location"
            value={rescueAnimal.addInfoLocation}
            onChange={handleInput}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default PostAnimal;

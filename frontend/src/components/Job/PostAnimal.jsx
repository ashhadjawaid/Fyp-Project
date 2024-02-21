import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import "./post.css"
const PostAnimal = () => {
  const { isAuthorized, user, authToken } = useContext(Context);
  const [animalPicture, setanimalPicture] = useState(null);
  const [rescueAnimal, setRescueAnimal] = useState({
    applicantName: "",
    applicantPhone: "",
    applicantEmail: "",
    animalSpecie: "dog",
    animalBreed: "",
    animalSize: "small",
    petCondition: "injured",
    location: "",
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
    setanimalPicture(animalPicture);
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setRescueAnimal({
      ...rescueAnimal,
      [name]: value,
    })
  }

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setRescueAnimal({ ...rescueAnimal, latitude: latitude.toString(), longitude: longitude.toString() });
    }, error => console.error(error));
  };


  const handlePostAnimal = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting data:", rescueAnimal);

      const formData = new FormData();

      // Append text data
      for (const key in rescueAnimal) {
        formData.append(key, rescueAnimal[key]);
      }

      // Append file data
      formData.append('animalPicture', animalPicture);

      const response = await fetch('http://localhost:4000/api/v1/job/postRescueDetails', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success(data.message);

      setRescueAnimal({
        applicantName: "",
        applicantPhone: "",
        applicantEmail: "",
        animalSpecie: "dog",
        animalBreed: "",
        animalSize: "small",
        petCondition: "injured",
        location: "",
        city: "",
        zip: "",
        addInfoAnimal: "",
        addInfoLocation: "",
        setanimalPicture: ""
      })
    } catch (error) {
      console.error(error.message, "error in submitting data from frontend");
      toast.error("Error in submitting data. Please try again.");
    }
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
          <input type="text"
            name='applicantName'
            placeholder='Applicant Name'
            value={rescueAnimal.applicantName}
            onChange={handleInput}
          />
          <input type="number"
            name='applicantPhone'
            placeholder='Applicant Phone Number'
            value={rescueAnimal.applicantPhone}
            onChange={handleInput}
          />
          <input type="email"
            name='applicantEmail'
            placeholder='Applicant Email'
            value={rescueAnimal.applicantEmail}
            onChange={handleInput}
          />

          <select
            name='animalSpecie'
            value={rescueAnimal.animalSpecie}
            onChange={handleInput}
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='bird'>Bird</option>
            <option value='other'>Other</option>
          </select>

          <input type="text"
            placeholder='Animal Breed'
            name='animalBreed'
            value={rescueAnimal.animalBreed}
            onChange={handleInput}
          />

          <select
            name='animalSize'
            value={rescueAnimal.animalSize}
            onChange={handleInput}
          >
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='big'>Big</option>
          </select>

          <select
            name='petCondition'
            value={rescueAnimal.petCondition}
            onChange={handleInput}
          >
            <option value='injured'>Injured</option>
            <option value='sick'>Sick</option>
            <option value='tangled'>Tangeled/Stuck</option>
            <option value='other'>Other</option>
          </select>
          <input type="text"
            placeholder='Address'
            name='location'
            value={rescueAnimal.location}
            onChange={handleInput}

          />
          <input type="text"
            placeholder='City'
            name='city'
            value={rescueAnimal.city}
            onChange={handleInput}
          />

          <input type="number"
            name='zip'
            placeholder='Zip Code'
            value={rescueAnimal.zip}
            onChange={handleInput}
          />
          <input type="number"
            name='latitude'
            placeholder='Latitude'
            value={rescueAnimal.latitude}
            onChange={handleInput}
          />
          <input type="number"
            name='longitude'
            placeholder='longitude'
            value={rescueAnimal.longitude}
            onChange={handleInput}
          />
          <div>
            <button type="button" onClick={fetchLocation}>Fetch Current location</button>
          </div>
          <div className='upload'>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Upload Photo
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <textarea type="text"
            placeholder='Additional information about animal'
            name='addInfoAnimal'
            value={rescueAnimal.addInfoAnimal}
            onChange={handleInput}
          />
          <textarea type="text"
            placeholder='Additional Info About location'
            name='addInfoLocation'
            value={rescueAnimal.addInfoLocation}
            onChange={handleInput}
          />

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  )
}

export default PostAnimal

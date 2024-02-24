import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./post.css"
import { MdUploadFile } from "react-icons/md";
import { MdCircle } from "react-icons/md";
const PostAnimal = () => {
  const [animalPicture, setAnimalPicture] = useState(null);
  const [rescueAnimal, setRescueAnimal] = useState({
    applicantName: "",
    applicantPhone: "",
    applicantEmail: "",
    animalSpecie: "dog",
    animalBreed: "",
    animalSize: "small",
    petCondition: "injured",
    address: "",
    city: "",
    zip: "",
    addInfoAnimal: "",
    addInfoLocation: ""
  });

  useEffect(() => {
    const loadGoogleMapScript = async () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHZlkpUQT9Bpq9un5O9TkNNrchMUwqzMo&libraries=places`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        initGoogleMap();
      };
    };
    loadGoogleMapScript();
  }, []);

  const initGoogleMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 24.9135104, lng: 67.0826496 },
      zoom: 15,
    });

    const geocoder = new window.google.maps.Geocoder();
    const infowindow = new window.google.maps.InfoWindow();

    map.addListener("click", (e) => {
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const address = results[0].formatted_address;
            setRescueAnimal({
              ...rescueAnimal,
              currentLocation: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              },
              address: address
            });
            infowindow.setContent(address);
            infowindow.setPosition(e.latLng);
            infowindow.open(map);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    });
  };

  const handleFileChange = (event) => {
    const animalPicture = event.target.files[0];
    setAnimalPicture(animalPicture);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRescueAnimal({
      ...rescueAnimal,
      [name]: value,
    });
  }

  const handlePostAnimal = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formData = new FormData();

      // Append text data
      for (const key in rescueAnimal) {
        formData.append(key, rescueAnimal[key]);
      }

      // Append file data
      formData.append('animalPicture', animalPicture);

      // Send form data to backend
      const response = await axios.post('http://localhost:4000/api/v1/job/postRescueDetails', formData, {
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
      applicantName: "",
      applicantPhone: "",
      applicantEmail: "",
      animalSpecie: "dog",
      animalBreed: "",
      animalSize: "small",
      petCondition: "injured",
      currentLocation: {
        lat: null,
        lng: null
      },
      address: "",
      city: "",
      zip: "",
      addInfoAnimal: "",
      addInfoLocation: ""
    });
    setAnimalPicture(null);
  };

  return (
    <div className='postAnimal'>
      <div className="container form-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-side-left">
            <h2>Rescue Protocol</h2>
            <p><MdCircle color='#f39946'/> Promptly respond to reports of injured or distressed animals.</p>
            <p><MdCircle color='#f39946'/> Prioritize safety for both the rescuer and the animal.</p>
            <p><MdCircle color='#f39946'/> Assess the situation carefully to determine the extent of the animal's injuries.</p>
            <p><MdCircle color='#f39946'/> Seek assistance from trained professionals for severe injuries or dangerous situations.</p>
            <p><MdCircle color='#f39946'/> Handle the aniTransport the rescued animal to a veterinary clinic or rehabilitation center for proper care.mal with care to prevent further harm or stress during rescue.</p>
            <p><MdCircle color='#f39946'/> Follow up on the animal's progress and ensure its release if recovered.</p>
            </div>
            
          </div>
          <div className="col-lg-6">
            <h3>Found any Animal?</h3>
            <form className='formPost' onSubmit={handlePostAnimal}>
              <div className="input-box">
                <input
                  type="text"
                  name="applicantName"
                  placeholder="Applicant Name"
                  value={rescueAnimal.applicantName}
                  onChange={handleInput}
                  className='input-style'
                />
                <input
                  type="tel"
                  name="applicantPhone"
                  placeholder="Applicant Phone Number"
                  value={rescueAnimal.applicantPhone}
                  onChange={handleInput}
                  className='input-style'
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="applicantEmail"
                  placeholder="Applicant Email"
                  value={rescueAnimal.applicantEmail}
                  onChange={handleInput}
                  className='input-style'
                />

                <select
                  name="animalSpecie"
                  value={rescueAnimal.animalSpecie}
                  onChange={handleInput}
                  className='input-style'
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="animalBreed"
                  placeholder="Animal Breed"
                  value={rescueAnimal.animalBreed}
                  onChange={handleInput}
                  className='input-style'
                />
                <select
                  name="animalSize"
                  value={rescueAnimal.animalSize}
                  onChange={handleInput}
                  className='input-style'
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="big">Big</option>
                </select>
              </div>
              <div className="input-box">
                <select
                  name="petCondition"
                  value={rescueAnimal.petCondition}
                  onChange={handleInput}
                  className='input-style'
                >
                  <option value="injured">Injured</option>
                  <option value="sick">Sick</option>
                  <option value="tangled">Tangled/Stuck</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  name="zip"
                  placeholder="Zip Code"
                  value={rescueAnimal.zip}
                  onChange={handleInput}
                  className='input-style'
                />
              </div>
              <div id="map" style={{ height: "300px", marginBottom: "10px", borderRadius: "10px" }} />
              <div className="input-box">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={rescueAnimal.address}
                  onChange={handleInput}
                  className='input-style'
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={rescueAnimal.city}
                  onChange={handleInput}
                  className='input-style'
                />
              </div>
              <div className="upload">
                <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
                  Upload Photo
                  <MdUploadFile/>
                </label>
                <input
                  type="file"
                  accept=".pdf, .jpg, .png"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                  className='upload-image'
                />
              </div>
              <textarea
                type="text"
                name="addInfoAnimal"
                placeholder="Additional information about animal"
                value={rescueAnimal.addInfoAnimal}
                onChange={handleInput}
                className='input-style'
              />
              <textarea
                type="text"
                name="addInfoLocation"
                placeholder="Additional Info About location"
                value={rescueAnimal.addInfoLocation}
                onChange={handleInput}
                className='input-style'
              />
              <input type="submit" value="Register" />
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PostAnimal;

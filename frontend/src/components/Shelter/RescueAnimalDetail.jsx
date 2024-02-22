import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import adop_img01 from '../../../public/assets/adop_img01.png';
import './Shelter.css';

const RescueAnimalDetail = () => {
  const { id } = useParams(); // Get the animal ID from the URL parameter
  const [rescueAnimal, setRescueAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/job/getAllRescue/${id}`, {
          method: "GET",
          // Include any necessary headers or credentials
        });

        const data = await response.json();
        setRescueAnimal(data.rescueAnimal);
        console.log(data)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (!rescueAnimal) {
    return <div>Loading...</div>;
  }
  return (
    <div className='RescueAnimalDetail'>
      <div className="container">
        <div className="row">
          <div className="img col-lg-6">
            <img src={rescueAnimal.animalPicture.url} alt="" />

          </div>
          <div className="col-lg-6">
            <div className="text-description">
              <p>Animal Breed: {rescueAnimal.animalBreed}</p>
              <p>Animal Size: {rescueAnimal.animalSize}</p>
              <p>Animal Condition: {rescueAnimal.petCondition}</p>
              <p>Address: {rescueAnimal.address}</p>
            </div>
            

          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h2>Applicant Detail</h2>
            <p>Apploicant Name: {rescueAnimal.applicantName}</p>
            <p>Applicant Email: {rescueAnimal.applicantEmail}</p>
            <p>Applicant Phone Number: {rescueAnimal.applicantPhone}</p>
          </div>
          <div className="col-lg-6">
            <h2>Information about Location</h2>
            <p>Zip Code: {rescueAnimal.zip}</p>
            <p>City: {rescueAnimal.city}</p>
            <p>Applicant Phone Number: {rescueAnimal.address}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h2>Additional Information</h2>
            <p>Additional Information about Injured Animal: {rescueAnimal.addInfoAnimal}</p>
            <p>Additional Information about Location: {rescueAnimal.addInfoLocation}</p>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default RescueAnimalDetail

import React, { useEffect, useState } from 'react'
import AdoptioImage1 from '../../../public/assets/adop_img01.png';
import { useParams } from 'react-router-dom';
const AdoptionDetail = () => {
  const { id } = useParams(); // Get the animal ID from the URL parameter
  const [adoptPet, setAdoptPet] = useState(null);
  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/adoption/all/${id}`, {
          method: "GET",
          // Include any necessary headers or credentials
        });

        const data = await response.json();
        setAdoptPet(data.adoptPet);
        console.log(data)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (!adoptPet) {
    return <div>Loading...</div>;
  }
  return (
    <div className='animal-detail-header'>
      <div className="header">
        <div className="container">
          <h1>Meet {adoptPet.petName}</h1>
          <div className='iconContainer'>
            <div className="icon-text">
              <span className="icon-bullets"></span>
              <p>Age: {adoptPet.age}</p>
            </div>
            <div className="icon-text">
              <span className="icon-bullets"></span>
              <p>Status: {adoptPet.petBreed}</p>
            </div>
            <div className="icon-text">
              <span className="icon-bullets"></span>
              <p>Female</p>
            </div>
          </div>
        </div>
      </div>
      <div className="animal-detail-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="adoption-img-box">
              <img src={AdoptioImage1} alt="" />
              </div>
              <div className="adoption-text">
                <h2>HI! I'M {adoptPet.petName}</h2>
                <p>{adoptPet.petBio}</p>
              </div>
          <div className="pet-Animal-Detail">
            <h3>More about {adoptPet.petName}</h3>
            <div className="adoption-table">
              <p>Weight: {adoptPet.weight}</p>
              <p>height: {adoptPet.height}</p>
              <p>HypoAllegenic: {adoptPet.hypoallegenic}</p>
              <p>Breed: {adoptPet.petBreed}</p>
              <p>Status: {adoptPet.status}</p>
            </div>
          </div>
            </div>
            <div className="col-lg-4">
              <div className="adoption-side">
                <div className="container">
                  <h2>Interested in Adopting?</h2>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, a quod et praesentium ratione animi atque nesciunt odit tempore numquam voluptate ab qui laborum ex maxime corporis autem neque voluptatum.
                  </p>
                  <div className="input-box">
                    <input type="email" name="email" placeholder='Enter Your Email Password' />
                    <button className="btn btn-primary">Start Your Inquiry</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdoptionDetail

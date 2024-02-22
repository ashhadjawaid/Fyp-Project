import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from "../../main";
import { Navigate, useNavigate } from 'react-router-dom';
import './Shelter.css'
const ShelterRescueRequest = () => {
    const { authToken } = useContext(Context);
    const [rescueAnimal, setRescueAnimal] = useState(null);
    const navigate = useNavigate();
    const getAllRescueRequest = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/admin/getAllRescueRequest', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                credentials: 'include',
            })
            const data = await response.json()
            if (response.status === 401) {
                // Unauthorized, redirect to home page
                return <Navigate to={'/'} />
            } else {
                setRescueAnimal(data.rescueAnimal);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const navigateToDetail = (rescueID) => {
        navigate(`/rescue-Detail/${rescueID}`);
    }
    useEffect(() => {
        getAllRescueRequest()
    }, [authToken])
    return (
        <div className='container'>
            <div className="row">

                {Array.isArray(rescueAnimal) && rescueAnimal.length > 0 ? (
                    rescueAnimal.map((currentUser, index) => (
                        <div className="col-lg-4" key={index}>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{currentUser.applicantName}</h5>
                                    <p className="card-text">{currentUser.animalSpecie}</p>
                                    <p className="card-text">{currentUser.applicantPhone}</p>
                                    <p className="card-text">{currentUser.location}</p>
                                    <button className="btn btn-primary" onClick={()=>navigateToDetail(currentUser._id)}>Read More Details</button>
                                </div>
                            </div>
                        </div>

                    ))
                ) : (
                    <div className=''>Yayyy..There are no animals in need of rescue.</div>
                )}



            </div>

        </div>
    )
}


export default ShelterRescueRequest

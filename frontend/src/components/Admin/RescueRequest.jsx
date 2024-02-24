import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from "../../main";
import { Navigate, useNavigate } from 'react-router-dom';
const RescueRequest = () => {
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
        <div className="container">
            <h2>Hello</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Applicant Name</th>
                        <th scope="col">Appivant Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Animal Condition</th>
                        <th scope="col">Animal Breed</th>
                        <th scope="col">Animal Size</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rescueAnimal) && rescueAnimal.length > 0 ? (
                        rescueAnimal.map((currentUser, index) => (
                            <tr key={index} onClick={()=>navigateToDetail(currentUser._id)} >
                                <th scope="row">{index + 1}</th>
                                <td>{currentUser.applicantName}</td>
                                <td>{currentUser.applicantEmail}</td>
                                <td>{currentUser.applicantPhone}</td>
                                <td>{currentUser.applicantName}</td>
                                <td>{currentUser.animalBreed}</td>
                                <td>{currentUser.animalSize}</td>
                                <td>{currentUser.location}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}


export default RescueRequest

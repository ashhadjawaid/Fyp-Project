import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from "../../main";
const ShelterRescueRequest = () => {
    const { authToken } = useContext(Context);
    const [rescueAnimal, setRescueAnimal] = useState(null);
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
    useEffect(() => {
        getAllRescueRequest()
    }, [authToken])
    return (
        <div classNameName='container'>
            <div className="row">
                <div className="col-lg-4">
                    {Array.isArray(rescueAnimal) && rescueAnimal.length > 0 ? (
                        rescueAnimal.map((currentUser, index) => (


                            <div className="card">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{currentUser.applicantName}</h5>
                                    <p className="card-text">{currentUser.applicantEmail}</p>
                                    <a href="#" className="btn btn-primary">Read More Details</a>
                                </div>
                            </div>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}

                </div>

            </div>

        </div>
    )
}


export default ShelterRescueRequest

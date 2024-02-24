import React, { useEffect, useState ,useContext } from 'react';
import { Context } from "../../main";
import { Navigate, useNavigate } from 'react-router-dom';

const AdminShelter = () => {
    const { authToken } = useContext(Context);
    const [shelters, setShelters] = useState(null);
    const navigate = useNavigate();
    
    const getAllShelters = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/shelter/get-all-shelter', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                credentials: 'include',
            })
            const data = await response.json()
            if (response.status === 401) {
                // Unauthorized, redirect to home page
                return <Navigate to={'/'} />;
            } else {
                setShelters(data.shelters);
            }
        } catch (error) {
            console.log(error.message);
        }  
    };

    useEffect(() => {
        getAllShelters();
    }, [authToken]);

    const navigateToDetail = (shelterID) => {
        navigate(`/shelter-Detail/${shelterID}`);
    };

    return (
        <div className="container">
            <h2>Shelters</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Shelter Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(shelters) && shelters.length > 0 ? (
                        shelters.map((currentShelter, index) => (
                            <tr key={index} onClick={() => navigateToDetail(currentShelter._id)} >
                                <th scope="row">{index + 1}</th>
                                <td>{currentShelter.shelterName}</td>
                                <td>{currentShelter.email}</td>
                                <td>{currentShelter.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No shelters found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminShelter;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShelterDetailPage = () => {
    const { shelterId } = useParams();
    const [shelter, setShelter] = useState(null);

    useEffect(() => {
        const fetchShelterDetail = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/shelter/get-shelter-byid/${shelterId}`);
                const data = await response.json();
                if (response.ok) {
                    setShelter(data.shelter);
                } else {
                    console.error('Error fetching shelter detail:', data.message);
                }
            } catch (error) {
                console.error('Error fetching shelter detail:', error);
            }
        };

        fetchShelterDetail();
    }, [shelterId]);

    return (
        <div className="container">
            <h2>Shelter Detail</h2>
            {shelter ? (
                <div>
                    <p><strong>Name:</strong> {shelter.name}</p>
                    <p><strong>Shelter Name:</strong> {shelter.shelterName}</p>
                    <p><strong>Email:</strong> {shelter.email}</p>
                    <p><strong>Address:</strong> {shelter.address}</p>
                    {/* Add more shelter details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShelterDetailPage;

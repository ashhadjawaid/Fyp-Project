import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import the toast function
import './AllShelter.css'; // Import the CSS file

const AllSheltersPage = () => {
  const { rescueId } = useParams();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  console.log(rescueId); // Get the rescue request ID from the URL parameter
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/shelter/get-all-shelter');
        if (response.ok) {
          const data = await response.json();
          setShelters(data.shelters);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        setError('Failed to fetch shelters');
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  const handleSendRequest = async (shelterId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/send-to-shelter/${rescueId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shelterId })
      });
      if (response.ok) {
        // Request sent successfully, display toast notification and redirect to admin page
        toast.success('Request sent successfully');
        navigate('/admin/users'); // Redirect to the admin page
      } else {
        // Request failed, handle error (e.g., show error message)
        console.error('Failed to send request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">All Shelters</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="shelter-list">
        {shelters.map((shelter, index) => (
          <li key={index} className="shelter-card">
            <h3>{shelter.shelterName}</h3>
            <p><strong>Name:</strong> {shelter.name}</p>
            <p><strong>Email:</strong> {shelter.email}</p>
            <p><strong>Address:</strong> {shelter.address}</p>
            <p><strong>Request:</strong> {shelter.requestCount}</p>
            <button onClick={() => handleSendRequest(shelter._id)}>Send Request</button>
            {/* Add more shelter details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSheltersPage;

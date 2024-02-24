import React, { useEffect, useState ,useContext } from 'react'
import { Context } from "../../main";
import { Navigate, useNavigate } from 'react-router-dom';
const AdminShelter = () => {
    const { authToken } = useContext(Context);
    const [shelters, setShelters] = useState(null);
    const navigate = useNavigate();
    const getAllShelters = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/admin/get-all-shelter', {
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
            setShelters(data.shelters);
          }

        } catch (error) {
            console.log(error.message)
        }
       
    }

    const navigateToDetail = (rescueID) => {
        navigate(`/rescue-Detail/${rescueID}`);
    }
    useEffect(() => {
        getAllShelters()
    }, [authToken])
  return (
    <div>
      
    </div>
  )
}

export default AdminShelter

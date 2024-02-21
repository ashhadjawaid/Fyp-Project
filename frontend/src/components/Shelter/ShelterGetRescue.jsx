import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from "../../main";
const ShelterRescueRequest = () => {
    const { authToken } = useContext(Context);
  
    const getAllRescueRequest = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/job/postRescueDetails', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                credentials: 'include',
            })
            const data = await response.json()
            console.log(data)
            

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
      getAllRescueRequest()
    }, [authToken])
    return (
        <div>
       <h3>Hello Pagal</h3>
      </div>
    )
}


export default ShelterRescueRequest

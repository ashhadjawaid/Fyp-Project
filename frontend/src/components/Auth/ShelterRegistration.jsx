import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../main';
import { Link, Navigate } from "react-router-dom";
import "./auth.css";
import { FaAddressBook, FaHome, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

import toast from 'react-hot-toast';
import shelterRegImg from "../../../public/assets/signupShelter.png"

const LocationForm = () => {
    const { isAuthorized, setIsAuthorized } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        shelterName: '',
        email: '',
        address: '',
        latitude: '',
        longitude: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setFormData({ ...formData, latitude: latitude.toString(), longitude: longitude.toString() });
        }, error => console.error(error));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/shelter/createshelter', formData);
            console.log(response.data);
            // Add any further actions upon successful registration
            const { data } = response;
            toast.success(data.message);
            setFormData("");
            setIsAuthorized(true);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    if (isAuthorized) {
        return <Navigate to={'/'} />
    }


    return (
        <section className='authPage'>
            <div className='container'>
                <div className='header'>
                    <h2>Register Shelter Home</h2>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputTag">
                        <label>Name:</label>
                        <div>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder='Enter your name' />
                        <FaPencilAlt />
                        </div>
                    </div>
                    <div className="inputTag">
                        <label>Shelter Name:</label>
                        <div>
                            <input type="text" name="shelterName" value={formData.shelterName} onChange={handleChange} required placeholder='Like: ACF' />
                            <FaHome />
                        </div>
                    </div>
                    <div className="inputTag">
                        <label>Email:</label>
                        <div>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='abc@gmail.com' />
                            <MdOutlineMailOutline />
                        </div>
                    </div>
                    <div className="inputTag">
                        <label>Address:</label>
                        <div>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder='abc North Karachi, Karachi' />
                            <FaAddressBook />
                        </div>
                    </div>
                    <div>
                        <label>Latitude:</label>
                        <div>
                            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <label>Longitude:</label>
                        <div>
                            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='regbutton'>
                        <button className='butt' type="button" onClick={fetchLocation}>Fetch Current Location</button>
                    </div>
                    <button className='registButton' type="submit">Register</button>
                </form>
                </div>
                <div className='banner'>
                    <img src={shelterRegImg} alt="login" />
                </div>
          

        </section>

    );
};

export default LocationForm;

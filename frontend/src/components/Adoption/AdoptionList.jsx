import React, { useEffect, useState } from 'react'
import AdoptioImage1 from '../../../public/assets/adop_img01.png';
import "./Adoption.css"
import { useNavigate } from 'react-router-dom';
const AdoptionList = () => {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        const getAllAdoptions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/adoption/all', {
                    method: "GET",
                })
                const data = await response.json();
                setDataList(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        getAllAdoptions();
    }, []);

    const navigateToDetail = (ID) => {
        navigate(`/adoption-detail/${ID}`);
    }
    return (

        <div className='Adoption-List py-5'>
            <div className="container">
                <h2>Meet Our Adorable Pets Looking for Forever Homes</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, aspernatur quasi dolorem praesentium doloribus modi blanditiis consectetur enim qui. Maiores odit iusto quis sint repellat veniam dolores sapiente eum inventore.</p>
                <div className='row'>
                    {dataList.length > 0 ? (
                        <>
                            {dataList.map((item) => (
                                <div className='col-lg-4' key={item._id}>

                                    <div className="adoption-box">
                                        <div className="adoption-img">
                                            <img src={AdoptioImage1} alt="" />
                                        </div>
                                        <div className="adoption-text-box">
                                            <h3>Pet Name:{item.petName}</h3>
                                            <div className='iconContainer'>
                                                <div className="icon-text">
                                                    <span className="icon-bullets"></span>
                                                    <p>Age: {item.age}</p>
                                                </div>
                                                <div className="icon-text">
                                                    <span className="icon-bullets"></span>
                                                    <p>Status: {item.status}</p>
                                                </div>
                                                <div className="icon-text">
                                                    <span className="icon-bullets"></span>
                                                    <p>Female</p>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" onClick={() => navigateToDetail(item._id)}>Adopt Me!</button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No data available</p>
                    )}


                </div>
            </div>
        </div>
    )
}

export default AdoptionList

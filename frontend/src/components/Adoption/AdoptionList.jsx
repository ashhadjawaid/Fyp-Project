import React, { useEffect, useState } from 'react'
import AdoptioImage1 from '../../../public/assets/adop_img01.png';
const AdoptionList = () => {
    const [adoptionList, setAdoptionList] = useState(null)
    const getAllAdoptions = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/adoption/all', {
                method: "GET",
            })
            const data = await response.json()
            setAdoptionList(data.adoptionList);

        } catch (error) {
            console.log(error.message)
        }
    }

    const navigateToDetail = () => {
       console.log("iqra")
    }
    useEffect(() => {
        getAllAdoptions()
    }, [])
    return (
        <div className='Adoption-List py-5'>

            <div className="container">
                <h2>Meet Our Adorable Pets Looking for Forever Homes</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, aspernatur quasi dolorem praesentium doloribus modi blanditiis consectetur enim qui. Maiores odit iusto quis sint repellat veniam dolores sapiente eum inventore.</p>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="adoption-box">
                            <div className="adoption-img">
                                <img src={AdoptioImage1} alt="" />
                            </div>

                            <div className="adoption-text-box">
                                <h3>Hello</h3>
                                <p>lorem Ipsum</p>
                                <div className="icon-text">
                                    <span className="icon-bullets"></span>
                                    <p>hello</p>
                                </div>
                                <div className="icon-text">
                                    <span className="icon-bullets"></span>
                                    <p>hello</p>
                                </div>
                                <div className="icon-text">
                                    <span className="icon-bullets"></span>
                                    <p>hello</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3"></div>
            </div>
        </div>

    )
}

export default AdoptionList

import React from 'react'
import { TbCheck } from "react-icons/tb";
const AdoptionBanner = () => {
    return (
        <div className='paws-banner'>
            <div className="container py-5">
                <diw className="row">
                    <div className="col-lg-6">
                        <div className="banner-heading">
                            <h2>Adopt love. Save a life. Find your furry friend today.</h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-sub-detail">
                            <p>Choosing adoption means offering a second chance at life to a deserving pet in need. It's about opening your heart and home to a loyal companion who will fill your days with joy and love. Visit us today to find your perfect match and experience the rewarding journey of rescue and companionship.</p>
                            <div className="head-sub-text">
                                <div className="icon-text">
                                    <div className="icon-bg">
                                        <TbCheck color="#fff"
                                            fontSize={14}
                                        />
                                    </div>

                                    <h4>Compatibility</h4>
                                </div>
                                <div className="icon-text">
                                    <div className="icon-bg">
                                        <TbCheck color="#fff"
                                            fontSize={14}
                                        />
                                    </div>
                                    <h4>Commitment</h4>
                                </div>
                                <div className="icon-text">
                                    <div className="icon-bg">
                                        <TbCheck color="#fff"
                                            fontSize={14}
                                        />
                                    </div>
                                    <h4>Care</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </diw>
            </div>
        </div>
    )
}

export default AdoptionBanner

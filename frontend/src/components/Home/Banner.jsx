import React from 'react'
import './home.css'
import bannerImage1 from '../../../public/assets/banner1.jpg'
import bannerImage2 from '../../../public/assets/banner2.jpg'
import bannerImage3 from '../../../public/assets/banner3.jpg'

const Banner = () => {
  return (
    <section className="slider_section">
      <div className="carousel slide" data-ride="carousel">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-4">
              <div className="slider_detail-box text-center text-md-left">
                <h1 className="large-heading">
                  Every Paw Deserves a 
                  <span>   Loving</span>
                   Home
                </h1>
                
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="slider_img img1">
                <img src={bannerImage3} alt=""/>
              </div>
              <div className="slider_img img2">
                <img src={bannerImage2} alt=""/>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="slider_img img3">
                <img src={bannerImage1} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

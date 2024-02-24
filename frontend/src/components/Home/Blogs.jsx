import React from 'react'
import { TbClock } from "react-icons/tb";
import blog1 from '../../../public/assets/blog-1.jpeg'
import blog2 from '../../../public/assets/blog-2.jpeg'
import blog3 from '../../../public/assets/blog-3.jpeg'
import blog4 from '../../../public/assets/blog-4.jpeg'
const Blogs = () => {
  return (
    <div className='blogs'>
      <div className="container py-5">
        <h2>Our Latest Blog & Articles</h2>
        <p className='text-center'>Discover the latest insights and tips for enhancing your shelter home experience on our blog. Stay informed and inspired with our curated collection of articles.</p>
        <div className="row my-5">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="blog-image">
                <img src={blog4} alt="" />
              </div>

            </div>
            <div className="col-lg-6">
              <div className="blog-details">
                <div className="blog-cat">
                  <p>Pet Adoption</p>
                </div>
                <div className="blog-title">
                  <h4>Why Adopting a Senior Pet Can Be Your Best Decision Ever</h4>
                </div>
                <div className="blog-date">
                  <TbClock color='#F69B03' />
                  <p>October 6, 2023</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="blog-image">
                <img src={blog1} alt="" />
              </div>

            </div>
            <div className="col-lg-6">
              <div className="blog-details">
                <div className="blog-cat">
                  <p>Pet Adoption</p>
                </div>
                <div className="blog-title">
                  <h4>Why Adopting a Senior Pet Can Be Your Best Decision Ever</h4>
                </div>
                <div className="blog-date">
                  <TbClock color='#F69B03' />
                  <p>October 6, 2023</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="blog-image">
                <img src={blog2} alt="" />
              </div>

            </div>
            <div className="col-lg-6">
              <div className="blog-details">
                <div className="blog-cat">
                  <p>Pet Adoption</p>
                </div>
                <div className="blog-title">
                  <h4>Why Adopting a Senior Pet Can Be Your Best Decision Ever</h4>
                </div>
                <div className="blog-date">
                  <TbClock color='#F69B03' />
                  <p>October 6, 2023</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="blog-image">
                <img src={blog3} alt="" />
              </div>

            </div>
            <div className="col-lg-6">
              <div className="blog-details">
                <div className="blog-cat">
                  <p>Pet Adoption</p>
                </div>
                <div className="blog-title">
                  <h4>Why Adopting a Senior Pet Can Be Your Best Decision Ever</h4>
                </div>
                <div className="blog-date">
                  <TbClock color='#F69B03' />
                  <p>October 6, 2023</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default Blogs

import React from 'react'
import adoptionBanner from '../../../public/assets/s2.webp'
const CtaAdoption = () => {
  return (
   
       <section className="ban_sec">
        <div className="container">
            <div className="ban_img">
                <img src={adoptionBanner} border="0"/>
                <div className="ban_text">
                    <strong>
                        <span>Helping Paws</span><br/> Find Homes
                    </strong>
                    <p>Make a difference in a shelter animal's life with love. <br/>
                        care, and a forever home. </p>
                    <a href="#">Adopt Now</a>
                </div>
            </div>
        </div>
    </section>
   
  )
}

export default CtaAdoption

import React from 'react'
import bannerRescue from '../../../public/assets/rescue-img.jpeg'
const CtaRescue = () => {
  return (
    <div>
         <section className="ban-rescue">
        <div className="container">
            <div className="rescue-img">
                <img src={bannerRescue} border="0"/>
                <div className="rescue-text">
                    <strong>
                        <span>Rescue a Paw</span><br/> Save a Life
                    </strong>
                    <p>Make a difference in a rescue animal's life with love,  <br/>
                        care, and a forever home.</p>
                    <a href="#">Rescue Now</a>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default CtaRescue

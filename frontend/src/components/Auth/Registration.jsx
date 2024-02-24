// import React from 'react'
// import { Link, useNavigate } from "react-router-dom";
// const Registration = () => {
//   return (
//     <div className='container'>
//       <Link to='/register'>Register as a User</Link>
//       <Link to='/shelter-registration'>Register as a Shelter</Link>
//     </div>
//   )
// }

// export default Registration

import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../public/assets/backgroundregist.jpg';
import pic1 from "../../../public/assets/Animal shelter-bro.png";
import pic2 from "../../../public/assets/Adopt a pet-amico.png";
import './registration.css';

const Registration = () => {
  return (
    <section className='registration2'>
      <div className='colorOverlay'>
        <div className='container'>
          <div className="sectionnew">
            <h2>Register as a User</h2>
            <img src={pic1} alt="Image 1" />
            <p>Join us by registering as a user to unlock exclusive benefits and features.</p>
            <Link to='/register'>Sign Up Now</Link>
          </div>
          <div className="sectionnew">
            <h2>Register as a Shelter</h2>
            <img src={pic2} alt="Image 2" />
            <p>Register your shelter now and receive invaluable assistance tailored to your needs.</p>
            <Link to='/shelter-registration'>Sign Up Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;





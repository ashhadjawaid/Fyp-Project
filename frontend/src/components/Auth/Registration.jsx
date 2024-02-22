import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const Registration = () => {
  return (
    <div className='container'>
      <Link to='/register'>Register as a User</Link>
      <Link to='/shelter-registration'>Register as a Shelter</Link>
    </div>
  )
}

export default Registration

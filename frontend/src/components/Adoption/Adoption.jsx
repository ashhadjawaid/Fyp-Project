import React from 'react'
import AdoptionBanner from './AdoptionBanner'
import './Adoption.css'
import AdoptionList from './AdoptionList'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'

const Adoption = () => {
  return (
    <div>
      <Navbar/>
      <AdoptionBanner/>
      <AdoptionList/>
      <Footer/>
    </div>
  )
}

export default Adoption

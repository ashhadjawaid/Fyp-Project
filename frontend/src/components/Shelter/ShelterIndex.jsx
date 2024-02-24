import React from 'react'
import ShelterRescueRequest from './ShelterGetRescue'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'

export const ShelterIndex = () => {
  return (
    <>
    <Navbar/>
      <ShelterGetRescue />
      <Footer/>
      </>
  )
}

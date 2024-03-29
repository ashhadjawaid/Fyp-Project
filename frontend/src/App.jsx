import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import PostAnimal from './components/Job/PostAnimal';
import Adoption from "./components/Adoption/Adoption";
import Admin from "./components/Admin/Admin";
import AdminUser from "./components/Admin/AdminUser";
import RescueRequest from "./components/Admin/RescueRequest";
import ShelterRegistration from './components/Auth/ShelterRegistration'
import Registration from './components/Auth/Registration'
import ShelterGetRescue from "./components/Shelter/ShelterGetRescue"
import RescueAnimalDetail from "./components/Shelter/RescueAnimalDetail";
import AdminShelter from "./components/Admin/AdminShelter";
import AdoptionForm from "./components/Adoption/AdoptionForm";
import ShelterDetailPage from "./components/Shelter/ShelterDetailsPage";
import AllSheltersPage from "./components/Shelter/AllShelterPage";
import AdoptionDetail from "./components/Adoption/AdoptionDetail";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, setAuthToken } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setAuthToken(response.data.token);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
       
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/shelter-registration" element={<ShelterRegistration />} />
          <Route path="/shelter-rescue-info" element={<ShelterGetRescue/>}/>
          <Route path="/rescue-detail/:id" element={<RescueAnimalDetail/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/rescue" element={<PostAnimal />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/adoption-form" element={<AdoptionForm />} />
          <Route path="/adoption-detail/:id" element={<AdoptionDetail/>} />
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUser />}/>
            <Route path="rescue-request" element={<RescueRequest />}/>
            <Route path="shelters" element={<AdminShelter />}/>
          </Route>
          <Route path="/all-shelters/:rescueId" element={<AllSheltersPage />} />
          {/* Route for Shelter Detail Page */}
          <Route path="/shelter-Detail/:shelterId" element={<ShelterDetailPage />} />
        </Routes>
       
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;

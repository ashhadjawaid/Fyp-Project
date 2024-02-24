import React from 'react';
import { Link } from "react-router-dom";
import './layout.css'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="footer-icons">
              <div className="icon-circle">
                <FaFacebookF color='#002624' fontSize={22} />
              </div>
              <div className="icon-circle">
                <FaInstagram color='#002624' fontSize={22} />
              </div>
              <div className="icon-circle">
                <FaTwitter color='#002624' fontSize={22} />
              </div>
            </div>

          </div>
          <div className="row">
            <div className="footer-links">
            <Link to="/event">Events</Link>
            <Link to="/animals">Animals</Link>
            <Link to="/">Home</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right_text">
        <div className="container">
          <div className="bordered_1px"></div>
          <div className="row">
            <div className="col-xl-12">
              <p className="copy_right text-center"> Copyright &copy;<script>document.write(new Date().getFullYear());</script>All rights reserved </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


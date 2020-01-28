import React from "react";
import "./LandingPage.css";
import { Button, Icon } from "antd";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <p className="landing-page-heading">Events</p>
      <NavLink to="/homePage">
        <button className="landing-page-button">
          Get Started <Icon type="arrow-right" className="landing-page-icon" />
        </button>
      </NavLink>
    </div>
  );
};

export default LandingPage;

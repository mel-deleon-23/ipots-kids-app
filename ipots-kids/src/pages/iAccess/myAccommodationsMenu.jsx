import React, { useEffect,useContext , useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/iAccess/myAccommodations.css";
import { AuthContext } from "../Auth";

import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";

import assistiveTechImg from "../../../public/iAccess/Assistive Technology.png";
import caduceusImg from "../../../public/iAccess/Caduceus.png";
import allergyImg from "../../../public/iAccess/06-allergy.png";
import backImg from "../../../public/iAccess/Back.png";

const MyAccommodations = () => {
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const [userId , setUserId] = useState("1");
  const { user } = useContext(AuthContext);

  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate();

//  set user id if user is signed in else navigate to signin
  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    }
    else {
      navigate('/home');
    }
  }, [user]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (url, event) => {
    //checking if the user selected the location
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault(); // Prevent the default link click behavior
      return;
    }

    const newUrl = url + "?location=" + selectedLocation;

    navigate(newUrl);
  };
  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const categories = [
    {
      name: "My Accessibility Category",
      img: assistiveTechImg,
      url: "/myaccessmenu",
    },
    {
      name: "My Medical Conditions",
      img: caduceusImg,
      url: "/mymedicalconditions",
    },
    { name: "My Allergies", img: allergyImg, url: "/myallergies" },
  ];

  return (
    <div className="myAccommodations">
      <h1 className="myAccommodations-title">My Accommodations</h1>
      <div className="myNavbar-container">
        {locations.map((location) => (
          <div
            key={location.name}
            className={`myLocation ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={() => handleLocationClick(location.name)}
          >
            <img
              src={location.img}
              alt={location.name}
              className="myLocation-img"
            />
            <span className="myLocation-name">{location.name}</span>
          </div>
        ))}
      </div>
      <div className="myAccessibility-categories-container">
        {categories.map((category) => (
          <div
            key={category.name}
            className="myAccessibility-category"
            onClick={(event) => checkBeforeNavigate(category.url, event)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="myAccessibility-category-icon"
            />
            <span className="myAccessibility-category-name">
              {category.name}
            </span>
            <img
              src={backImg}
              alt="Back"
              className="myAccessibility-category-back"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccommodations;

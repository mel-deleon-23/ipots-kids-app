import React, { useContext,useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../Auth";

import "../../styles/iAccess/accessmenu.css";
import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";

import visionImg from "../../../public/iAccess/01-vision.png";
import earImg from "../../../public/iAccess/02-hearing.png";
import mobilityImg from "../../../public/iAccess/03-mobility.png";
import brainImg from "../../../public/iAccess/04-cognitive.png";
import sensorImg from "../../../public/iAccess/05-sensory.png";
import allergyImg from "../../../public/iAccess/06-allergy.png";
import safetyImg from "../../../public/iAccess/07-safety.png";
import stomachImg from "../../../public/iAccess/08-digestion.png";
import painImg from "../../../public/iAccess/9-pain.png";
import medicalImg from "../../../public/iAccess/10-medical devices.png";
import mentalImg from "../../../public/iAccess/11-mental health.png";
import medicationImg from "../../../public/iAccess/12-medication.png";

import grayVisionImg from "../../../public/iAccess/01-vision-grey.png";
import grayEarImg from "../../../public/iAccess/02-hearing-grey.png";
import grayMobilityImg from "../../../public/iAccess/03-mobility-grey.png"; // Gray images
import grayBrainImg from "../../../public/iAccess/04-cognitive-grey.png";
import graySensorImg from "../../../public/iAccess/05-sensory-grey.png";
import grayAllergyImg from "../../../public/iAccess/06-allergy-grey.png";
import graySafetyImg from "../../../public/iAccess/07-safety-grey.png";
import grayStomachImg from "../../../public/iAccess/08-digestion-grey.png";
import grayPainImg from "../../../public/iAccess/09-pain-grey.png";
import grayMedicalImg from "../../../public/iAccess/10-medical devices-grey.png";
import grayMentalImg from "../../../public/iAccess/11-mental health-grey.png";
import grayMedicationImg from "../../../public/iAccess/12-medication-grey.png";


const AccessMenu = () => {
  const locat = useLocation(); // Get the current location object
  const [userId , setUserId] = useState("1");
  const { user } = useContext(AuthContext);
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const location = queryParams.get("location");
  const medicalCondition = queryParams.get('medicalCondition');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [myAccessibilityCat,setMyAccessibilityCat] =useState('');
  const navigate = useNavigate();

//set user id if user is signed in else navigate to signin
useEffect(() => {
  if (user) {
    setUserId(user.data.user_id);
  }
  else {
    navigate('/home');
  }
}, [user]);
  

useEffect(() => {
  // for fetching data from database when page loads 
  const fetchmyAccessibilityCat = async () => {
      try {
          const params = {
              method: 'Category',
              userId: userId,
              location: location
          };
          
          // Checking if the user is coming from the medical page
          if (medicalCondition) {
              params.medicalCondition = medicalCondition;
          }
          
          const url = host + '/iPots/iAccess-Server/myAccessibility.php';
          const response = await axios.get(url, { params });
          
          setMyAccessibilityCat(response.data.map(item => item.category));
          // console.log(response.data.map(item => item.category));
          
        } catch (error) {
          console.error("Error fetching Accommodation:", error);
        }
  };
  fetchmyAccessibilityCat();
}, [location]);

const handleLocationClick = (location) => {
  setSelectedLocation(location);
  fetchmyAccessibilityCat();
};

const checkBeforeNavigate = (category, event) => {
  // checking if the user selected the location
  if (!selectedLocation) {
    alert("Please select a location first");
    event.preventDefault(); // Prevent the default link click behavior
    return;
  }
  let Url =
    "/myaccommodations?location=" + selectedLocation + "&category=" + category;

  if (medicalCondition) {
    Url += `&medicalCondition=${medicalCondition}`;
  }

  navigate(Url);
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
  { name: "Mobility", img: mobilityImg, grayImg: grayMobilityImg },
  { name: "Hearing", img: earImg, grayImg: grayEarImg },
  { name: "Cognitive", img: brainImg, grayImg: grayBrainImg },
  { name: "Mental Health", img: mentalImg, grayImg: grayMentalImg},
  { name: "Sensory", img: sensorImg, grayImg: graySensorImg},
  { name: "Allergy", img: allergyImg, grayImg: grayAllergyImg},
  { name: "Vision", img: visionImg, grayImg: grayVisionImg },
  { name: "Pain", img: painImg, grayImg: grayPainImg },
  { name: "Digestion", img: stomachImg, grayImg: grayStomachImg },
  { name: "Safety", img: safetyImg, grayImg: graySafetyImg },
  { name: "Medical Devices", img: medicalImg, grayImg: grayMedicalImg },
  { name: "Medicine", img: medicationImg, grayImg: grayMedicationImg },
];

return (
  <div className="access-menu-page">
    <h1 className="header-access-menu-title">
      My Accessibility Categories
    </h1>
    {medicalCondition && (
      <h1 className="medical-condition">{medicalCondition}</h1>
    )}
    <div className="navbar-access-menu-container">
      {locations.map((loc) => (
        <div
          key={loc.name}
          className={`location-access-menu ${
            selectedLocation === loc.name ? "selected" : ""
          }`}
          onClick={() => handleLocationClick(loc.name)}
        >
          <img
            src={loc.img}
            alt={loc.name}
            className="location-access-menu-img"
          />
          <span className="location-access-menu-name">{loc.name}</span>
        </div>
      ))}
    </div>
    <div className="categories-access-menu-container">
      {categories.map((category) => {
        const isCategoryAvailable = myAccessibilityCat.includes(category.name);
        return (
          <div
            key={category.name}
            className={`category-access-menu ${isCategoryAvailable ? "" : "category-access-gray-menu"}`}
            onClick={(event) => isCategoryAvailable && checkBeforeNavigate(category.name, event)}
          >
            <img
              src={isCategoryAvailable ? category.img : category.grayImg}
              alt={category.name}
              className="category-access-menu-icon"
            />
            <span className="category-access-menu-names">
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default AccessMenu;

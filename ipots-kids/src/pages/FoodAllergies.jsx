import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FoodAllergies() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    email,
    username,
    password,
    action,
    accept,
    dateOfBirth,
    parental,
    firstname,
    lastname,
    city,
    country,
  } = location.state || {};

  const [foodAllergies, setFoodAllergies] = useState([]);
  const [selectedFoodAllergies, setSelectedFoodAllergies] = useState([]);
  const [otherFoodAllergy, setOtherFoodAllergy] = useState(""); // New state for other allergies
  const [showOtherFoodInput, setShowOtherFoodInput] = useState(false); // State to manage "Other" checkbox

  useEffect(() => {
    if (!accept) {
      navigate("/ineligible");
      return;
    }

    axios
      .get("http://localhost/ipots-kids-app/ipots-server/allergies.php", {
        params: { type: "food" },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFoodAllergies(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setFoodAllergies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching allergies:", error);
        setFoodAllergies([]);
      });
  }, [accept, navigate]);

  const handleAllergyChange = (allergyId) => {
    setSelectedFoodAllergies((prevSelected) => {
      if (prevSelected.includes(allergyId)) {
        return prevSelected.filter((id) => id !== allergyId);
      } else {
        return [...prevSelected, allergyId];
      }
    });
  };

  const handleOtherCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setShowOtherFoodInput(isChecked);

    // If the checkbox is unchecked, clear the input field
    if (!isChecked) {
      setOtherFoodAllergy("");
    }
  };

  const handleOtherAllergyChange = (e) => {
    setOtherFoodAllergy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if "I do not have any" checkbox is selected
    const noAllergyChecked = document.getElementById("noAllergyS").checked;

    // Check if "Other" checkbox is checked
    const otherCheckboxChecked =
      document.getElementById("otherAllergy").checked;

    // If "I do not have any" is checked and there are selected or other allergies
    if (
      noAllergyChecked &&
      (selectedFoodAllergies.length > 0 || otherFoodAllergy.trim() !== "")
    ) {
      const confirmNoAllergy = window.confirm(
        "Are you sure that you have no allergy? If no, please uncheck 'I do not have any'."
      );

      if (confirmNoAllergy) {
        // Clear selected allergies, other allergies, and uncheck the "Other" checkbox
        setSelectedFoodAllergies([]);
        setOtherFoodAllergy("");
        setShowOtherFoodInput(false);
        // Skip further validation as we are clearing the inputs
        return;
      } else {
        // If the user cancels, prevent form submission
        return;
      }
    }

    // Final validation with the cleared states if applicable
    const finalSelectedFoodAllergies = noAllergyChecked
      ? []
      : selectedFoodAllergies;
    const finalOtherFoodAllergies = noAllergyChecked ? "" : otherFoodAllergy;

    // Validation checks
    if (
      !noAllergyChecked &&
      finalSelectedFoodAllergies.length === 0 &&
      finalOtherFoodAllergies.trim() === ""
    ) {
      alert(
        "Please select at least one food allergy, specify an 'Other' allergy, or indicate 'I do not have any'."
      );
      return;
    }

    if (otherCheckboxChecked && finalOtherFoodAllergies.trim() === "") {
      alert("Please specify your 'Other' allergies.");
      return;
    }

    if (!otherCheckboxChecked && finalOtherFoodAllergies.trim() !== "") {
      alert("Please check 'Other' checkbox to specify additional allergies.");
      return;
    }
    navigate("/environmental-allergies", {
      state: {
        email,
        username,
        password,
        action,
        accept,
        dateOfBirth,
        parental,
        firstname,
        lastname,
        city,
        country,
        selectedFoodAllergies: finalSelectedFoodAllergies,
        otherFoodAllergies: finalOtherFoodAllergies,
      },
    });
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/images/Allergies.png" alt="Allergies" />
        <h2>Any food allergies?</h2>
        <form onSubmit={handleSubmit}>
          <div className="allergies">
            {foodAllergies.map((allergy) => (
              <div key={allergy.id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergy-${allergy.id}`}
                  value={allergy.id}
                  checked={selectedFoodAllergies.includes(allergy.id)}
                  onChange={() => handleAllergyChange(allergy.id)}
                />
                <label
                  className="form-check-label label-allergies"
                  htmlFor={`allergy-${allergy.id}`}
                >
                  {allergy.title}
                </label>
              </div>
            ))}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="otherAllergy"
                checked={showOtherFoodInput}
                onChange={handleOtherCheckboxChange}
              />
              <label
                className="form-check-label label-allergies"
                htmlFor="otherAllergy"
              >
                Other (please specify)
              </label>
            </div>
            <div className="input-container input-allergies">
              <input
                type="text"
                className="form-control form-box input-placeholder input-place"
                id="otherAllergyInput"
                placeholder="Walnuts, Mango, etc."
                value={otherFoodAllergy}
                onChange={handleOtherAllergyChange}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="noAllergyS"
                value="0"
              />
              <label
                className="form-check-label label-allergies"
                htmlFor="noAllergyS"
              >
                I do not have any...
              </label>
            </div>
          </div>

          <div className="button-box d-flex flex-column justify-content-center align-items-center">
            <button type="submit" className="button-format buttonColor">
              Next
            </button>
            <Link
              to="/location"
              state={{
                email,
                username,
                password,
                action,
                accept,
                dateOfBirth,
                parental,
                firstname,
                lastname,
                city,
                country,
              }}
            >
              <button className="button-format buttonEmpty">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

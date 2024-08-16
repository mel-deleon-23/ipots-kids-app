import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MedicationAllergies() {
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
    selectedFoodAllergies,
    otherFoodAllergies,
    selectedEnvironmentAllergies,
    otherEnvironmentAllergies,
  } = location.state || {};

  const [medicationAllergies, setMedicationAllergies] = useState([]);
  const [selectedMedicationAllergies, setSelectedMedicationAllergies] =
    useState([]);
  const [otherMedicationAllergy, setOtherMedicationAllergy] = useState(""); // New state for other allergies
  const [showOtherMedicationInput, setShowOtherMedicationInput] =
    useState(false); // State to manage "Other" checkbox

  useEffect(() => {
    if (!accept) {
      navigate("/ineligible");
      return;
    }

    axios
      .get("http://localhost/ipots-kids-app/ipots-server/allergies.php", {
        params: { type: "medication" },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMedicationAllergies(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setMedicationAllergies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching allergies:", error);
        setMedicationAllergies([]);
      });
  }, [accept, navigate]);

  const handleAllergyChange = (allergyId) => {
    setSelectedMedicationAllergies((prevSelected) => {
      if (prevSelected.includes(allergyId)) {
        return prevSelected.filter((id) => id !== allergyId);
      } else {
        return [...prevSelected, allergyId];
      }
    });
  };

  const handleOtherCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setShowOtherMedicationInput(isChecked);

    // If the checkbox is unchecked, clear the input field
    if (!isChecked) {
      setOtherMedicationAllergy("");
    }
  };

  const handleOtherAllergyChange = (e) => {
    setOtherMedicationAllergy(e.target.value);
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
      (selectedMedicationAllergies.length > 0 ||
        otherMedicationAllergy.trim() !== "")
    ) {
      const confirmNoAllergy = window.confirm(
        "Are you sure that you have no allergy? If no, please uncheck 'I do not have any'."
      );

      if (confirmNoAllergy) {
        // Clear selected allergies, other allergies, and uncheck the "Other" checkbox
        setSelectedMedicationAllergies([]);
        setOtherMedicationAllergy("");
        setShowOtherMedicationInput(false);
        // Skip further validation as we are clearing the inputs
        return;
      } else {
        // If the user cancels, prevent form submission
        return;
      }
    }

    // Final validation with the cleared states if applicable
    const finalSelectedMedicationAllergies = noAllergyChecked
      ? []
      : selectedMedicationAllergies;
    const finalOtherMedicationAllergies = noAllergyChecked
      ? ""
      : otherMedicationAllergy;

    // Validation checks
    if (
      !noAllergyChecked &&
      finalSelectedMedicationAllergies.length === 0 &&
      finalOtherMedicationAllergies.trim() === ""
    ) {
      alert(
        "Please select at least one medication allergy, specify an 'Other' allergy, or indicate 'I do not have any'."
      );
      return;
    }

    if (otherCheckboxChecked && finalOtherMedicationAllergies.trim() === "") {
      alert("Please specify your 'Other' allergies.");
      return;
    }

    if (!otherCheckboxChecked && finalOtherMedicationAllergies.trim() !== "") {
      alert("Please check 'Other' checkbox to specify additional allergies.");
      return;
    }

    navigate("/medical-conditions", {
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
        selectedFoodAllergies,
        otherFoodAllergies,
        selectedEnvironmentAllergies,
        otherEnvironmentAllergies,
        selectedMedicationAllergies: finalSelectedMedicationAllergies,
        otherMedicationAllergies: finalOtherMedicationAllergies,
      },
    });
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/images/Allergies.png" alt="Allergies" />
        <h2>Any medication allergies?</h2>
        <form onSubmit={handleSubmit}>
          <div className="allergies">
            {medicationAllergies.map((allergy) => (
              <div key={allergy.id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergy-${allergy.id}`}
                  value={allergy.id}
                  checked={selectedMedicationAllergies.includes(allergy.id)}
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
                checked={showOtherMedicationInput}
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
                placeholder="Doxycycline, Flagyl, etc."
                value={otherMedicationAllergy}
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
              to="/environmental-allergies"
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
                selectedFoodAllergies,
                otherFoodAllergies,
                selectedEnvironmentAllergies,
                otherEnvironmentAllergies,
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

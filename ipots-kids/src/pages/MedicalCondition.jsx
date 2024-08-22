import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MedicalCondition() {
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
    selectedMedicationAllergies,
    otherMedicationAllergies,
  } = location.state || {};

  const [medicalCondition, setMedical] = useState([]);
  const [selectedMedical, setSelectedMedical] = useState([]);
  const [otherMedical, setOtherMedical] = useState(""); // New state for other allergies
  const [showOtherMedicalInput, setShowOtherMedicalInput] = useState(false); // State to manage "Other" checkbox

  useEffect(() => {
    if (!accept) {
      navigate("/ineligible");
      return;
    }

    axios
      .get("http://localhost/ipots-kids-app/ipots-server/allergies.php", {
        params: { type: "medical" },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMedical(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setMedical([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching medical conditions:", error);
        setMedical([]);
      });
  }, [accept, navigate]);

  const handleAllergyChange = (medicalId) => {
    setSelectedMedical((prevSelected) => {
      if (prevSelected.includes(medicalId)) {
        return prevSelected.filter((id) => id !== medicalId);
      } else {
        return [...prevSelected, medicalId];
      }
    });
  };

  const handleOtherCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setShowOtherMedicalInput(isChecked);

    // If the checkbox is unchecked, clear the input field
    if (!isChecked) {
      setOtherMedical("");
    }
  };

  const handleOtherAllergyChange = (e) => {
    setOtherMedical(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if "I do not have any" checkbox is selected
    const noMedicalChecked = document.getElementById("noMedicalS").checked;

    // Check if "Other" checkbox is checked
    const otherCheckboxChecked =
      document.getElementById("otherMedical").checked;

    // If "I do not have any" is checked and there are selected or other allergies
    if (
      noMedicalChecked &&
      (selectedMedical.length > 0 || otherMedical.trim() !== "")
    ) {
      const confirmNoMedical = window.confirm(
        "Are you sure that you have no medical condition? If no, please uncheck 'I do not have any'."
      );

      if (confirmNoMedical) {
        // Clear selected medical, other medical, and uncheck the "Other" checkbox
        setSelectedMedical([]);
        setOtherMedical("");
        setShowOtherMedicalInput(false);
        // Skip further validation as we are clearing the inputs
        return;
      } else {
        // If the user cancels, prevent form submission
        return;
      }
    }

    // Final validation with the cleared states if applicable
    const finalSelectedMedical = noMedicalChecked ? [] : selectedMedical;
    const finalOtherMedical = noMedicalChecked ? "" : otherMedical;

    // Validation checks
    if (
      !noMedicalChecked &&
      finalSelectedMedical.length === 0 &&
      finalOtherMedical.trim() === ""
    ) {
      alert(
        "Please select at least one medical condition, specify an 'Other' medical condition, or indicate 'I do not have any'."
      );
      return;
    }

    if (otherCheckboxChecked && finalOtherMedical.trim() === "") {
      alert("Please specify your 'Other' allergies.");
      return;
    }

    if (!otherCheckboxChecked && finalOtherMedical.trim() !== "") {
      alert("Please check 'Other' checkbox to specify additional allergies.");
      return;
    }

    navigate("/avatars", {
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
        selectedMedicationAllergies,
        otherMedicationAllergies,
        selectedMedical: finalSelectedMedical,
        otherMedical: finalOtherMedical,
      },
    });
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/images/Allergies.png" alt="Allergies" />
        <h2>Any diagnosed medical conditions?</h2>
        <form onSubmit={handleSubmit}>
          <div className="allergies">
            {medicalCondition.map((medical) => (
              <div key={medical.id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergy-${medical.id}`}
                  value={medical.id}
                  checked={selectedMedical.includes(medical.id)}
                  onChange={() => handleAllergyChange(medical.id)}
                />
                <label
                  className="form-check-label label-allergies"
                  htmlFor={`allergy-${medical.id}`}
                >
                  {medical.title}
                </label>
              </div>
            ))}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="otherMedical"
                checked={showOtherMedicalInput}
                onChange={handleOtherCheckboxChange}
              />
              <label
                className="form-check-label label-allergies"
                htmlFor="otherMedical"
              >
                Other (please specify)
              </label>
            </div>
            <div className="input-container input-allergies">
              <input
                type="text"
                className="form-control form-box input-placeholder input-place"
                id="otherMedicalInput"
                placeholder="Glaucoma, Hypothyroidism, etc."
                value={otherMedical}
                onChange={handleOtherAllergyChange}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="noMedicalS"
                value="0"
              />
              <label
                className="form-check-label label-allergies"
                htmlFor="noMedicalS"
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
              to="/medication-allergies"
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
                selectedMedicationAllergies,
                otherMedicationAllergies,
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

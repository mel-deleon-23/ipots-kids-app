import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function EnvironmentalAllergies() {
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
  } = location.state || {};

  const [EnvironmentAllergies, setEnvironmentAllergies] = useState([]);
  const [selectedEnvironmentAllergies, setSelectedEnvironmentAllergies] =
    useState([]);
  const [otherEnvironmentAllergy, setOtherEnvironmentAllergy] = useState(""); // New state for other allergies
  const [showOtherEnvironmentInput, setShowOtherEnvironmentInput] =
    useState(false); // State to manage "Other" checkbox
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState(""); // Add this state
  const [modalType, setModalType] = useState(""); // Track modal type for button behavior

  useEffect(() => {
    if (!accept) {
      navigate("/ineligible");
      return;
    }

    axios
      .get("http://localhost/ipots-kids-app/ipots-server/allergies.php", {
        params: { type: "environmental" },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEnvironmentAllergies(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setEnvironmentAllergies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching allergies:", error);
        setEnvironmentAllergies([]);
      });
  }, [accept, navigate]);

  const handleAllergyChange = (allergyId) => {
    setSelectedEnvironmentAllergies((prevSelected) => {
      if (prevSelected.includes(allergyId)) {
        return prevSelected.filter((id) => id !== allergyId);
      } else {
        return [...prevSelected, allergyId];
      }
    });
  };

  const handleOtherCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setShowOtherEnvironmentInput(isChecked);

    // If the checkbox is unchecked, clear the input field
    if (!isChecked) {
      setOtherEnvironmentAllergy("");
    }
  };

  const handleOtherAllergyChange = (e) => {
    setOtherEnvironmentAllergy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if "I do not have any" checkbox is selected
    const noAllergyChecked = document.getElementById("noAllergyS").checked;

    // Check if "Other" checkbox is checked
    const otherCheckboxChecked =
      document.getElementById("otherAllergy").checked;

    // Scenario 1: "I do not have any" is checked and there are selected or other allergies
    if (
      noAllergyChecked &&
      (selectedEnvironmentAllergies.length > 0 ||
        otherEnvironmentAllergy.trim() !== "")
    ) {
      setModalTitle("ARE YOU SURE?");
      setModalContent(
        "If you do not have any allergies, please unclick selected allergies."
      );
      setModalType("noAllergyWithSelected");
      setShowModal(true);
      return;
    }

    // Final validation with the cleared states if applicable
    const finalSelectedEnvironmentAllergies = noAllergyChecked
      ? []
      : selectedEnvironmentAllergies;
    const finalOtherEnvironmentAllergies = noAllergyChecked
      ? ""
      : otherEnvironmentAllergy;

    // Validation checks
    if (
      !noAllergyChecked &&
      finalSelectedEnvironmentAllergies.length === 0 &&
      finalOtherEnvironmentAllergies.trim() === ""
    ) {
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent(
        "Please select at least one environmental allergy or I do not have any."
      );
      setModalType("noSelectedBox");
      setShowModal(true);
      return;
    }

    // Scenario 2: "Other" checkbox is checked but no allergy is specified
    if (otherCheckboxChecked && finalOtherEnvironmentAllergies.trim() === "") {
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent('Please type in your "Other" allergies.');
      setModalType("otherCheckedWithoutInput");
      setShowModal(true);
      return;
    }

    // Scenario 3: Other allergies are typed but "Other" checkbox is not checked
    if (!otherCheckboxChecked && finalOtherEnvironmentAllergies.trim() !== "") {
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent(
        'Please, click "Other" to register your typed allergies.'
      );
      setModalType("inputWithoutOtherChecked");
      setShowModal(true);
      return;
    }
    navigate("/medication-allergies", {
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
        selectedEnvironmentAllergies: finalSelectedEnvironmentAllergies,
        otherEnvironmentAllergies: finalOtherEnvironmentAllergies,
      },
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOk = () => {
    if (modalType === "noAllergyWithSelected") {
      // Clear selected allergies, other allergies, and uncheck the "Other" checkbox
      setSelectedEnvironmentAllergies([]);
      setOtherEnvironmentAllergy("");
      setShowOtherEnvironmentInput(false);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    if (modalType === "noAllergyWithSelected") {
      // Uncheck the "I do not have any" checkbox
      document.getElementById("noAllergyS").checked = false;
    }
    setShowModal(false);
  };
  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="/images/Allergies.png" alt="Allergies" />
        <h2>Any environmental allergies?</h2>
        <form onSubmit={handleSubmit}>
          <div className="allergies">
            {EnvironmentAllergies.map((allergy) => (
              <div key={allergy.id} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergy-${allergy.id}`}
                  value={allergy.id}
                  checked={selectedEnvironmentAllergies.includes(allergy.id)}
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
                checked={showOtherEnvironmentInput}
                onChange={handleOtherCheckboxChange}
              />
              <label
                className="form-check-label label-allergies"
                htmlFor="otherAllergy"
              >
                Other
              </label>
            </div>
            <div className="input-container input-allergies">
              <input
                type="text"
                className="form-control form-box input-placeholder input-place"
                id="otherAllergyInput"
                placeholder="Ants, Spiders, etc."
                value={otherEnvironmentAllergy}
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
              to="/food-allergies"
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
              }}
            >
              <button className="button-format buttonEmpty">Back</button>
            </Link>
          </div>
        </form>
      </div>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        dialogClassName={`custom-modal ${
          modalType === "noAllergyWithSelected" ? "large-modal" : "small-modal"
        }`}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <img
          className="sad-allergies"
          src={`/images/sad-allergies.png`}
          alt="Sad icon"
        />
        <Modal.Body
          className={`${
            modalType === "noAllergyWithSelected"
              ? "small-space"
              : "large-space"
          }`}
        >
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          {modalType === "noAllergyWithSelected" ? (
            <>
              <Button variant="primary" onClick={handleModalOk}>
                OK
              </Button>
              <Button variant="secondary" onClick={handleModalCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleModalClose}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

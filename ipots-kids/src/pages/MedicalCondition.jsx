import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

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
      setModalTitle("ARE YOU SURE?");
      setModalContent(
        "If you do not have any medical condition, please unclick selected medical conditions."
      );
      setModalType("noMedicalWithSelected");
      setShowModal(true);
      return;
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
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent(
        "Please select at least one medical condition or I do not have any."
      );
      setModalType("noSelectedBox");
      setShowModal(true);
      return;
    }

    if (otherCheckboxChecked && finalOtherMedical.trim() === "") {
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent('Please type in your "Other" medical conditions.');
      setModalType("otherCheckedWithoutInput");
      setShowModal(true);
      return;
    }

    if (!otherCheckboxChecked && finalOtherMedical.trim() !== "") {
      setModalTitle("OOPS, YOU FORGOT!");
      setModalContent(
        'Please, click "Other" to register your typed medical conditions.'
      );
      setModalType("inputWithoutOtherChecked");
      setShowModal(true);
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOk = () => {
    if (modalType === "noMedicalWithSelected") {
      // Clear selected medical conditions, other medical conditions, and uncheck the "Other" checkbox
      setSelectedMedical([]);
      setOtherMedical("");
      setShowOtherMedicalInput(false);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    if (modalType === "noMedicalWithSelected") {
      // Uncheck the "I do not have any" checkbox
      document.getElementById("noMedicalS").checked = false;
    }
    setShowModal(false);
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
      <Modal
        show={showModal}
        onHide={handleModalClose}
        dialogClassName={`custom-modal ${
          modalType === "noMedicalWithSelected" ? "large-modal" : "small-modal"
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
            modalType === "noMedicalWithSelected"
              ? "small-space"
              : "large-space"
          }`}
        >
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          {modalType === "noMedicalWithSelected" ? (
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

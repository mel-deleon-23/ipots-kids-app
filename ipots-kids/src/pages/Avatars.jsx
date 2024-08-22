import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Auth"; // Import AuthContext

export default function Avartar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext); // Get login function from context
  const {
    email,
    username,
    password,
    action,
    accept,
    dateOfBirth,
    parental,
    numberOfChildren,
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
    selectedMedical,
    otherMedical,
    isUpdate, //  check if the user is updating the avatar
  } = location.state || {};

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!accept && !isUpdate) {
      navigate("/ineligible");
      return;
    }

    // Fetch the list of images and their IDs from the backend
    axios
      .get("http://localhost/ipots-kids-app/ipots-server/avatar.php", {
        params: { type: action },
      })
      .then((response) => {
        // Ensure that the response data is an array
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setImages([]); // Set an empty array to avoid errors
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setImages([]); // Set an empty array in case of an error
      });
  }, [action, accept, navigate, isUpdate]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const apiEndpoint = isUpdate
      ? "http://localhost/ipots-kids-app/ipots-server/update_avatar.php"
      : "http://localhost/ipots-kids-app/ipots-server/signup.php";

    const payload = {
      email,
      username,
      password,
      dateOfBirth,
      action,
      accept,
      parental,
      numberOfChildren,
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
      selectedMedical,
      otherMedical,
      imageId: selectedImage.id,
      imageName: selectedImage.image,
    };

    console.log(payload);

    axios
      .post(apiEndpoint, payload)
      .then((result) => {
        // console.log("Result Data:", result.data); // Log the result for debugging
        if (result.data.status === "success") {
          alert(
            isUpdate
              ? "Avatar updated successfully!"
              : "Account created successfully!"
          );

          if (isUpdate) {
            // const existingToken = JSON.parse(
            //   localStorage.getItem("sessionData")
            // );
            // console.log(existingToken);
            if (action === "kids") {
              navigate("/kids-profile", {
                state: {
                  email,
                  username,
                  password,
                  imageName: selectedImage.image, // Pass updated imageName to the next page
                  action,
                },
              });
            } else if (action === "teachers") {
              navigate("/teachers-profile");
            } else if (action === "parents") {
              navigate("/parents-profile", {
                state: {
                  email,
                  username,
                  password,
                  imageName: selectedImage.image, // Pass update imageName to the next page
                  action,
                },
              });
            } else if (action === "iaccess") {
              navigate("/iaccess-profile", {
                state: {
                  email,
                  username,
                  password,
                  firstname,
                  lastname,
                  imageName: selectedImage.image, // Pass imageName to the next page
                  action,
                  accept,
                },
              });
            }
          } else {
            // save a session token with 3 hours
            const expireTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours in milliseconds
            const sessionData = {
              token: result.data.token,
              expiration: expireTime,
            };
            localStorage.setItem("sessionData", JSON.stringify(sessionData));

            // Update Auth
            login(result.data.token);

            if (action === "kids") {
              navigate("/kids-success", {
                state: {
                  email,
                  username,
                  password,
                  imageName: selectedImage.image, // Pass imageName to the next page
                  action,
                  accept,
                },
              });
            } else if (action === "teachers") {
              navigate("/teachers-success", {
                state: {
                  email,
                  username,
                  password,
                  imageName: selectedImage.image, // Pass imageName to the next page
                  action,
                  accept,
                },
              });
            } else if (action === "parents") {
              navigate("/parents-success", {
                state: {
                  email,
                  username,
                  password,
                  imageName: selectedImage.image, // Pass imageName to the next page
                  action,
                  accept,
                },
              });
            } else if (action === "iaccess") {
              navigate("/iaccess-success", {
                state: {
                  email,
                  username,
                  password,
                  firstname,
                  lastname,
                  imageName: selectedImage.image, // Pass imageName to the next page
                  action,
                  accept,
                },
              });
            }
          }
        } else {
          alert(
            "Failed to " +
              (isUpdate ? "update avatar: " : "create account: ") +
              result.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting image ID:", error);
      });
  };

  return (
    <div className="App">
      <h2>Choose An Avatar</h2>
      <form onSubmit={handleSubmit}>
        <div className="image-gallery">
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image.id}
                className={`image-item ${
                  selectedImage && selectedImage.id === image.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={`/images/avartars/${action}/${image.image}.png`}
                  alt={image.image}
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="button-box d-flex flex-column justify-content-center align-items-center">
          <button type="submit" className=" button-format buttonColor">
            Next
          </button>
          <Link
            to={
              isUpdate
                ? `/${action}-profile`
                : parental
                ? "/parental"
                : numberOfChildren
                ? "/children-number"
                : "/dateOfBirth"
            }
            state={{
              email,
              username,
              password,
              dateOfBirth,
              action,
              accept,
              parental,
              numberOfChildren,
            }}
          >
            <button className="buttonEmpty button-format">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

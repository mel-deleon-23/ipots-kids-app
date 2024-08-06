import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Avartar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, password, action, accept, dateOfBirth, parental } =
    location.state || {};
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!accept) {
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
  }, [action, accept, navigate]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    axios
      .post("http://localhost/ipots-kids-app/ipots-server/signup.php", {
        email,
        username,
        password,
        dateOfBirth,
        action,
        accept,
        parental,
        imageId: selectedImage.id,
        imageName: selectedImage.image,
      })
      .then((result) => {
        if (result.data.status === "success") {
          alert("Account created successfully!");
          navigate("/kids-success", {
            state: {
              email,
              username,
              password,
              imageName: selectedImage.image, // Pass imageName to the next page
              action,
            },
          });
        } else {
          alert("Failed to create account: " + result.data.message);
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
          <Link to="/parental">
            <button className="buttonEmpty button-format">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

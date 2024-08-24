import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Auth"; // Import AuthContext

export default function ManageKids() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { user_type } = location.state || {};

  if (!user) {
    navigate("/signIn");
  }

  const [kids, setKids] = useState([]);

  // Fetch user details from server
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("sessionData"));
        const token = tokenData?.token;
        const userId = user.data.id;

        if (!token || !userId) {
          navigate("/signIn");
          return;
        }

        const response = await axios.get(
          "http://localhost/ipots-kids-app/ipots-server/manage.php",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: userId },
          }
        );

        if (response.data.status === "success") {
          setKids(response.data.user);
        } else {
          console.error("Failed to fetch user details:", response.data.message);
          navigate("/signIn");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/signIn");
      }
    };

    fetchUserDetails();
  }, [navigate, user]);

  const handleBack = () => {
    if (user_type === "teachers") {
      navigate("/teachers-profile");
    } else {
      navigate("/parents-profile");
    }
  };

  const handleAdd = () => {
    navigate("/addKids");
  };

  return (
    <div className="App">
      <h2 style={{ marginBottom: "40px" }}>List of your kids</h2>
      {kids.length > 0 ? (
        kids.map((kid) => (
          <div key={kid.id} className="kid-container">
            <div
              className={`kidname ${kid.status === "Pending" ? "pending" : ""}`}
            >
              <h2>@{kid.username}</h2>
              <img
                className="image-back"
                src="/images/Back.png"
                alt="Back icon"
              />
            </div>
            {kid.status === "Pending" && (
              <button className="status-kids">{kid.status}</button>
            )}
          </div>
        ))
      ) : (
        <p>No kids</p>
      )}
      <div className="button-box d-flex flex-column justify-content-center align-items-center">
        <button
          type="submit"
          className="button-format buttonColor"
          onClick={handleAdd}
        >
          Add a new kid
        </button>

        <button className="buttonEmpty button-format" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

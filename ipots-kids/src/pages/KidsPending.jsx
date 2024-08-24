import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Auth"; // Import AuthContext

export default function KidsPending() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [pendingKids, setPendingKids] = useState([]);
  const [message, setMessage] = useState("No Pending");
  const [supervisorId, setSupervisorId] = useState(null);

  if (!user) {
    navigate("/signIn");
  }

  // Fetch pending kids details from server
  useEffect(() => {
    const fetchPendingKids = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("sessionData"));
        const token = tokenData?.token;
        const kidId = user.data.id;

        if (!token || !kidId) {
          navigate("/signIn");
          return;
        }

        const response = await axios.get(
          "http://localhost/ipots-kids-app/ipots-server/kids_pending.php",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: kidId },
          }
        );

        if (response.data.status === "success") {
          const pending = response.data.pendingKids;
          if (pending.length > 0) {
            setPendingKids(pending);
            setSupervisorId(response.data.supervisor_id); // Store the supervisorId
            setMessage(
              `Do you accept "${response.data.supervisorUsername}" as a Parent/Teacher?`
            );
          } else {
            setMessage("No Pending");
            setPendingKids([]);
          }
        } else {
          //   console.error("Failed to fetch pending kids:", response.data.message);
          setMessage("No Pending");
          setPendingKids([]);
        }
      } catch (error) {
        console.error("Error fetching pending kids:", error);
        setMessage("Error fetching pending kids");
        setPendingKids([]);
      }
    };

    fetchPendingKids();
  }, [navigate, user]);

  const handleAccept = async (kidId) => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("sessionData"));
      const token = tokenData?.token;

      if (!token || !supervisorId) {
        // Use supervisorId from state
        navigate("/signIn");
        return;
      }

      const response = await axios.post(
        "http://localhost/ipots-kids-app/ipots-server/kids_accept.php",
        { kid_id: kidId, supervisor_id: supervisorId }, // Pass the stored supervisorId
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setPendingKids(pendingKids.filter((kid) => kid.kid_id !== kidId));
        setMessage(
          pendingKids.length > 1
            ? `Do you accept "${response.data.supervisorUsername}" as a Parent/Teacher?`
            : "No Pending"
        );
      } else {
        console.error("Failed to accept kid:", response.data.message);
      }
    } catch (error) {
      console.error("Error accepting kid:", error);
    }
  };

  const handleReject = async (kidId) => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("sessionData"));
      const token = tokenData?.token;

      if (!token) {
        navigate("/signIn");
        return;
      }

      const response = await axios.post(
        "http://localhost/ipots-kids-app/ipots-server/kids_reject.php",
        { kid_id: kidId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        // Remove the rejected kid from the state
        setPendingKids(pendingKids.filter((kid) => kid.kid_id !== kidId));
        setMessage(
          pendingKids.length > 1
            ? `Do you accept "${response.data.supervisorUsername}" as a Parent/Teacher?`
            : "No Pending"
        );
      } else {
        console.error("Failed to reject kid:", response.data.message);
      }
    } catch (error) {
      console.error("Error rejecting kid:", error);
    }
  };

  const handleBack = () => {
    navigate("/kids-profile");
  };

  return (
    <div className="App">
      <h2 style={{ marginTop: "50px" }}>{message}</h2>

      {pendingKids.length > 0 ? (
        <div className="button-box d-flex flex-column justify-content-center align-items-center">
          <div className="accept-buttons">
            <button
              type="button"
              className="buttonEmpty button-format"
              onClick={() => handleAccept(pendingKids[0].kid_id)}
            >
              YES, I know
            </button>
            <button
              type="button"
              className="buttonEmpty button-format"
              onClick={() => handleReject(pendingKids[0].kid_id)}
            >
              NO, I don't
            </button>
          </div>
          <button className="buttonEmpty button-format" onClick={handleBack}>
            Back
          </button>
        </div>
      ) : (
        <div className="button-box d-flex flex-column justify-content-center align-items-center">
          <button className="buttonEmpty button-format" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

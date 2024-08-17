import "../styles/signup/styles.css";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <img className="" src={`/images/logo.png`} alt="logo" />
          <div className="button-box d-flex flex-column justify-content-center align-items-center">
            <Link to="/signIn">
              <button className=" button-format buttonColor">Sign in</button>
            </Link>
            <Link to="/consent">
              <button className=" button-format buttonEmpty">Sign up</button>
            </Link>
            {/* <Link to="/google"> */}
            {profile ? (
              <div>
                <img src={profile.picture} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br />
                <button
                  onClick={() => logOut()}
                  className=" button-format buttonGoogle d-flex flex-row justify-content-center align-items-center"
                >
                  <img
                    className="google"
                    src={`/images/google.png`}
                    alt="google"
                  />{" "}
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className=" button-format buttonGoogle d-flex flex-row justify-content-center align-items-center"
              >
                <img
                  className="google"
                  src={`/images/google.png`}
                  alt="google"
                />{" "}
                Sign in with Google
              </button>
            )}
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

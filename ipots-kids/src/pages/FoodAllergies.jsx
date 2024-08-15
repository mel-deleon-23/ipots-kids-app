import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <img className="" src="/images/Allergies.png" alt="Allergies" />
          <h2>Any food allergies?</h2>
          <div className="allergies">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="allergies"
                value="option1"
              />
              <label className="form-check-label" htmlFor="allergies">
                1
              </label>
            </div>
            <div className="input-container input-allergies">
              <input
                type="text"
                className="form-control form-box input-placeholder input-place"
                id="firstname"
                placeholder="Walnuts, Mango, etc."
                name="firstname"
                value=""
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="noAllergyS"
                value="option1"
              />
              <label className="form-check-label" htmlFor="allergies">
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
        </div>
      </div>
    </>
  );
}

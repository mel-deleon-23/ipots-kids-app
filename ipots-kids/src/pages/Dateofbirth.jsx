import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles

export default function DateOfBirth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, action, accept, password } = location.state || {};
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleChange = (date) => {
    setDateOfBirth(date);
    if (date) {
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = dateOfBirth
      ? dateOfBirth.toISOString().split("T")[0]
      : "";
    const age = calculateAge(dateOfBirth);
    // console.log("date", formattedDate);
    if (action === "kids" && age < 13) {
      navigate("/parental", {
        state: {
          email,
          username,
          password,
          dateOfBirth: formattedDate,
          action,
          accept,
        },
      });
    } else if ((action === "teachers" || action === "parents") && age >= 19) {
      navigate("/children-number", {
        state: {
          email,
          username,
          password,
          dateOfBirth: formattedDate,
          action,
          accept,
        },
      });
    } else if (action === "kids" && age >= 13) {
      navigate("/avatars", {
        state: {
          email,
          username,
          password,
          dateOfBirth: formattedDate,
          action,
          accept,
        },
      });
    } else {
      navigate("/unsuitable", {
        state: {
          email,
          username,
          password,
          dateOfBirth: formattedDate,
          action,
          accept,
        },
      });
    }
    //else {
    //   navigate("/parental", {
    //     state: {
    //       email,
    //       username,
    //       password,
    //       dateOfBirth: formattedDate,
    //       action,
    //       accept,
    //     },
    //   });
    // }
  };

  const isDayDisabled = (date) => {
    return (
      date.getMonth() !== currentMonth || date.getFullYear() !== currentYear
    );
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Date of Birth</h2>
        <div className="dob-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="date-container">
              <DatePicker
                selected={dateOfBirth}
                onChange={handleChange}
                dateFormat="MMMM d, yyyy"
                placeholder=""
                className="form-control form-box calendar-placeholder"
                minDate={new Date(1900, 0, 1)} // Optionally set a minimum date
                maxDate={new Date(2100, 11, 31)} // Optionally set a maximum date
                dayClassName={(date) =>
                  isDayDisabled(date) ? "outside-month" : ""
                }
                filterDate={(date) => !isDayDisabled(date)}
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="custom-header">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newDate = new Date(
                          date.setMonth(date.getMonth() - 1)
                        );
                        setCurrentMonth(newDate.getMonth());
                        setCurrentYear(newDate.getFullYear());
                        decreaseMonth();
                      }}
                      disabled={prevMonthButtonDisabled}
                      className="nav-arrow"
                    >
                      {"<"}
                    </button>
                    <select
                      value={date.getMonth()}
                      onChange={({ target: { value } }) => {
                        const newDate = new Date(
                          date.setMonth(parseInt(value))
                        );
                        setCurrentMonth(newDate.getMonth());
                        setCurrentYear(newDate.getFullYear());
                        changeMonth(parseInt(value));
                      }}
                      className="month-dropdown"
                    >
                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index} value={index}>
                          {new Date(0, index).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) => {
                        const newDate = new Date(
                          date.setFullYear(parseInt(value))
                        );
                        setCurrentMonth(newDate.getMonth());
                        setCurrentYear(newDate.getFullYear());
                        changeYear(parseInt(value));
                      }}
                      className="year-dropdown"
                    >
                      {Array.from({ length: 100 }, (_, index) => (
                        <option
                          key={index}
                          value={new Date().getFullYear() - index}
                        >
                          {new Date().getFullYear() - index}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newDate = new Date(
                          date.setMonth(date.getMonth() + 1)
                        );
                        setCurrentMonth(newDate.getMonth());
                        setCurrentYear(newDate.getFullYear());
                        increaseMonth();
                      }}
                      disabled={nextMonthButtonDisabled}
                      className="nav-arrow"
                    >
                      {">"}
                    </button>
                  </div>
                )}
              />
              <img
                className="date-icon"
                src="/images/calendar.png"
                alt="calendar"
              />
            </div>
            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="button-format buttonColor">
                Next
              </button>
              <Link to="/signup">
                <button className="buttonEmpty button-format">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

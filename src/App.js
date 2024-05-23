import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useLocation } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

function Form() {
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/success", { state: formValues });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.firstName) errors.firstName = "First Name is required!";
    if (!values.lastName) errors.lastName = "Last Name is required!";
    if (!values.username) errors.username = "Username is required!";
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must contain at least 8 characters, including letters and numbers!";
    }
    if (!values.phoneNo) errors.phoneNo = "Phone Number is required!";
    if (!values.country) errors.country = "Country is required!";
    if (!values.city) errors.city = "City is required!";
    if (!values.panNo) errors.panNo = "Pan No. is required!";
    if (!values.aadharNo) errors.aadharNo = "Aadhar No. is required!";
    
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          {Object.keys(formErrors).map((key) => (
            <p key={key}>{formErrors[key]}</p>
          ))}
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="button">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone Number"
              value={formValues.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Country</label>
            <select name="country" value={formValues.country} onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Brazil">Brazil</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Russia">Russia</option>
              <option value="South Africa">South Africa</option>
              <option value="Mexico">Mexico</option>

              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          <div className="field">
            <label>City</label>
            <select name="city" value={formValues.city} onChange={handleChange}>
              <option value="">Select City</option>
              <option value="Delhi">Delhi</option>
              <option value="London">London</option>
              <option value="Berlin">Berlin</option>
              <option value="Paris">Paris</option>
              <option value="Rome">Rome</option>
              <option value="Madrid">Madrid</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Beijing">Beijing</option>
              <option value="Moscow">Moscow</option>
              <option value="Cape Town">Cape Town</option>
              <option value="Mexico City">Mexico City</option>

              <option value="New York">New York</option>
              <option value="Toronto">Toronto</option>
              <option value="Sydney">Sydney</option>
            </select>
          </div>
          <div className="field">
            <label>Pan No.</label>
            <input
              type="text"
              name="panNo"
              placeholder="Pan No."
              value={formValues.panNo}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Aadhar No.</label>
            <input
              type="text"
              name="aadharNo"
              placeholder="Aadhar No."
              value={formValues.aadharNo}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button center">Submit</button>
             {/* disabled={Object.keys(formErrors).length !== 0} */}
          
         
        </div>
      </form>
    </div>
  );
}

function Success() {
  const { state } = useLocation();

  return (
    <div className="container">
      <h1>Submission Successful</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;

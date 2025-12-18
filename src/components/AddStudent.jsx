import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddStudent.css";

const AddStudent = ({ students, setStudents }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhone(value);
      setPhoneError("");
    } else {
      setPhoneError("Only numbers allowed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName || !lastName || !phone || !email ||
      !gender || !address || !dob
    ) {
      alert("Please fill all fields");
      return;
    }

    if (phone.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    // DOB validation
const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

if (!dobRegex.test(dob)) {
  alert("Enter DOB in DD/MM/YYYY format");
  return;
}


    const newStudent = {
      id: Date.now(),
      firstName,
      lastName,
      phone,
      email,
      gender,
      address,
      dob,
    };

    setStudents([...students, newStudent]);
    navigate("/");
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setGender("");
    setAddress("");
    setDob("");
    setPhoneError("");
  };

  return (
    <div className="add-student">
      <h1>Add Student</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {/* Gender Section */}
<div className="form-group">
  <label className="form-label">Gender</label>
  <div className="gender-group">
    <label className="gender-option">
      <input
        type="radio"
        value="Male"
        checked={gender === "Male"}
        onChange={(e) => setGender(e.target.value)}
      />
      <span>Male</span>
    </label>

    <label className="gender-option">
      <input
        type="radio"
        value="Female"
        checked={gender === "Female"}
        onChange={(e) => setGender(e.target.value)}
      />
      <span>Female</span>
    </label>
  </div>
</div>
       {/* Date of Birth */}
<input
  type="text"
  placeholder="Date of Birth (DD/MM/YYYY)"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  maxLength="10"
/>


        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          maxLength="10"
          onChange={handlePhoneChange}
        />
        {phoneError && <p className="error-text">{phoneError}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Address */}
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditStudent.css";

const EditStudent = ({ students, setStudents }) => {
  const { id } = useParams();
  const studentToEdit = students.find((s) => s.id === parseInt(id));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (studentToEdit) {
      setFirstName(studentToEdit.firstName);
      setLastName(studentToEdit.lastName);
      setPhone(studentToEdit.phone);
      setEmail(studentToEdit.email);
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    const updatedStudents = students.map((s) =>
      s.id === parseInt(id) ? { ...s, firstName, lastName, phone, email } : s
    );
    setStudents(updatedStudents);
    navigate("/");
  };

  return (
    <div className="edit-student">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;

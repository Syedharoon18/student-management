import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/StudentList.css";

const StudentList = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // "single" | "multiple"
  const [studentToDelete, setStudentToDelete] = useState(null);

  // 🔍 Search filter
  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.phone} ${student.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ☑ Checkbox handler
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 🗑 Single delete click
  const handleSingleDeleteClick = (id) => {
    setStudentToDelete(id);
    setDeleteType("single");
    setShowConfirm(true);
  };

  // 🗑 Delete selected click
  const handleDeleteSelectedClick = () => {
    if (selectedIds.length === 0) return;
    setDeleteType("multiple");
    setShowConfirm(true);
  };

  // ✅ Confirm delete
  const confirmDelete = () => {
    if (deleteType === "single") {
      setStudents(students.filter((s) => s.id !== studentToDelete));
    } else {
      setStudents(students.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }

    setShowConfirm(false);
    setStudentToDelete(null);
    setDeleteType(null);
  };

  // ❌ Cancel delete
  const cancelDelete = () => {
    setShowConfirm(false);
    setStudentToDelete(null);
    setDeleteType(null);
  };

  return (
    <div className="student-container">
      <h2>Student Management</h2>

      {/* 🔝 TOP BAR */}
      <div className="top-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search student..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* RIGHT SIDE BUTTONS */}
        <div className="top-actions">
          <button
            className="btn delete-btn"
            disabled={selectedIds.length === 0}
            onClick={handleDeleteSelectedClick}
          >
            Delete Selected
          </button>

          <Link to="/add-student">
            <button className="btn add-btn">+ Add Student</button>
          </Link>
        </div>
      </div>

      {/* 📋 RESPONSIVE TABLE */}
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>S.ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student.id)}
                      onChange={() => handleCheckboxChange(student.id)}
                    />
                  </td>

                  <td>{index + 1}</td>

                  <td>
                    {student.firstName} {student.lastName}
                  </td>

                  <td>{student.gender}</td>
                  <td>{student.dob}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>

                  {/* ACTION BUTTONS */}
                  <td>
                    <div className="action-btn-group">
                      <Link to={`/edit-student/${student.id}`}>
                        <button className="btn edit-btn">Edit</button>
                      </Link>

                      <button
                        className="btn delete-btn"
                        onClick={() =>
                          handleSingleDeleteClick(student.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 CONFIRM DELETE MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Deletion</h3>
            <p>
              {deleteType === "multiple"
                ? "Are you sure you want to delete selected students?"
                : "Are you sure you want to delete this student?"}
            </p>

            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn delete-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;

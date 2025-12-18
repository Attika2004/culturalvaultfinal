import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import "./ManageAgents.css";

const API_BASE = "http://localhost:5000/api/admin/agents";

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ADD
  const [addFname, setAddFname] = useState("");
  const [addLname, setAddLname] = useState("");
  const [addCnic, setAddCnic] = useState("");
  const [addContact, setAddContact] = useState("");
  const [addExperience, setAddExperience] = useState("");
  const [addLanguages, setAddLanguages] = useState("");
  const [addBio, setAddBio] = useState("");

  // EDIT
  const [editId, setEditId] = useState("");
  const [editFname, setEditFname] = useState("");
  const [editLname, setEditLname] = useState("");
  const [editCnic, setEditCnic] = useState("");
  const [editContact, setEditContact] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editLanguages, setEditLanguages] = useState("");
  const [editBio, setEditBio] = useState("");

  // DELETE
  const [deleteId, setDeleteId] = useState("");

  // Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const res = await axios.get(API_BASE);
      // Assuming backend returns { success: true, agents: [...] }
      setAgents(res.data.agents || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAdd = async () => {
    if (!addFname || !addCnic || !addContact)
      return alert("First Name, CNIC & Contact required");

    try {
      await axios.post(API_BASE, {
        Fname: addFname,
        Lname: addLname,
        CNIC: addCnic,
        ContactNo: addContact,
        ExperienceYears: addExperience || null,
        Languages: addLanguages,
        Bio: addBio,
      });
      alert("Agent added successfully");
      setAddFname("");
      setAddLname("");
      setAddCnic("");
      setAddContact("");
      setAddExperience("");
      setAddLanguages("");
      setAddBio("");
      fetchAgents();
    } catch (err) {
      console.error(err);
      alert("Failed to add agent");
    }
  };

  const handleEdit = async () => {
    if (!editId) return alert("Agent ID required");

    try {
      await axios.put(`${API_BASE}/${editId}`, {
        Fname: editFname,
        Lname: editLname,
        CNIC: editCnic,
        ContactNo: editContact,
        ExperienceYears: editExperience || null,
        Languages: editLanguages,
        Bio: editBio,
      });
      alert("Agent updated successfully");
      setEditId("");
      setEditFname("");
      setEditLname("");
      setEditCnic("");
      setEditContact("");
      setEditExperience("");
      setEditLanguages("");
      setEditBio("");
      fetchAgents();
    } catch (err) {
      console.error(err);
      alert("Failed to update agent");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return alert("Agent ID required");

    try {
      await axios.delete(`${API_BASE}/${deleteId}`);
      alert("Agent deleted successfully");
      setDeleteId("");
      fetchAgents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete agent");
    }
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.Fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.Lname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.CNIC?.includes(searchQuery) ||
      a.GuideID?.toString() === searchQuery
  );

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-title">Manage Agents</h1>
        <p className="admin-subtitle">Add, edit or remove tour agents</p>

        <div className="form-grid">
          {/* ADD */}
          <div className="admin-card">
            <h3>Add Agent</h3>
            <input
              placeholder="First Name"
              value={addFname}
              onChange={(e) => setAddFname(e.target.value)}
            />
            <input
              placeholder="Last Name"
              value={addLname}
              onChange={(e) => setAddLname(e.target.value)}
            />
            <input
              placeholder="CNIC"
              value={addCnic}
              onChange={(e) => setAddCnic(e.target.value)}
            />
            <input
              placeholder="Contact No"
              value={addContact}
              onChange={(e) => setAddContact(e.target.value)}
            />
            <input
              placeholder="Experience Years"
              value={addExperience}
              onChange={(e) => setAddExperience(e.target.value)}
            />
            <input
              placeholder="Languages"
              value={addLanguages}
              onChange={(e) => setAddLanguages(e.target.value)}
            />
            <textarea
              placeholder="Bio"
              value={addBio}
              onChange={(e) => setAddBio(e.target.value)}
            />
            <button className="btn primary" onClick={handleAdd}>
              Add Agent
            </button>
          </div>

          {/* EDIT */}
          <div className="admin-card">
            <h3>Edit Agent</h3>
            <input
              placeholder="Agent ID"
              value={editId}
              onChange={(e) => setEditId(e.target.value)}
            />
            <input
              placeholder="First Name"
              value={editFname}
              onChange={(e) => setEditFname(e.target.value)}
            />
            <input
              placeholder="Last Name"
              value={editLname}
              onChange={(e) => setEditLname(e.target.value)}
            />
            <input
              placeholder="CNIC"
              value={editCnic}
              onChange={(e) => setEditCnic(e.target.value)}
            />
            <input
              placeholder="Contact No"
              value={editContact}
              onChange={(e) => setEditContact(e.target.value)}
            />
            <input
              placeholder="Experience Years"
              value={editExperience}
              onChange={(e) => setEditExperience(e.target.value)}
            />
            <input
              placeholder="Languages"
              value={editLanguages}
              onChange={(e) => setEditLanguages(e.target.value)}
            />
            <textarea
              placeholder="Bio"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
            />
            <button className="btn warning" onClick={handleEdit}>
              Update Agent
            </button>
          </div>

          {/* DELETE */}
          <div className="admin-card">
            <h3>Delete Agent</h3>
            <input
              placeholder="Agent ID"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button className="btn danger" onClick={handleDelete}>
              Delete Agent
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <h3>All Agents</h3>
          <input
            className="search-input"
            placeholder="Search by ID, Name or CNIC"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>CNIC</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan="6">No agents found</td>
                </tr>
              ) : (
                filteredAgents.map((a) => (
                  <tr key={a.GuideID}>
                    <td>{a.GuideID}</td>
                    <td>
                      {a.Fname} {a.Lname}
                    </td>
                    <td>{a.CNIC}</td>
                    <td>{a.ContactNo}</td>
                    <td>{a.ExperienceYears}</td>
                    <td>{a.Languages}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageAgents;

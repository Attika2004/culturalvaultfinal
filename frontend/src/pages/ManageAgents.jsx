import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import "./ManageAgents.css";

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addApproved, setAddApproved] = useState(false);

  const [editAgentId, setEditAgentId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editApproved, setEditApproved] = useState(false);

  const [deleteAgentId, setDeleteAgentId] = useState("");
  const [deleteAgentName, setDeleteAgentName] = useState("");

  // Placeholder functions
  const handleAddAgent = () => {
    alert(`Agent ${addName} added!`);
  };

  const handleEditAgent = () => {
    alert(`Agent ${editAgentId} updated!`);
  };

  const handleDeleteAgent = () => {
    if (deleteAgentId) {
      alert(`Agent with ID ${deleteAgentId} deleted!`);
    } else if (deleteAgentName) {
      alert(`Agent named "${deleteAgentName}" deleted!`);
    } else {
      alert("Enter Agent ID or Name to delete!");
    }
  };

  useEffect(() => {
    // Placeholder agents
    setAgents([
      { id: 1, name: "Ali Khan", email: "ali@mail.com", phone: "03001234567", city: "Lahore", approved: true },
      { id: 2, name: "Sara Ahmed", email: "sara@mail.com", phone: "03111234567", city: "Karachi", approved: false },
      { id: 3, name: "Ahmed Raza", email: "ahmed@mail.com", phone: "03221234567", city: "Islamabad", approved: true }
    ]);
  }, []);

  const filteredAgents = agents.filter(
    (a) =>
      a.id.toString() === searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
    <div className="manage-agents-container">
      <h1 className="page-title">Manage Agents</h1>
      <p className="page-subtext">Add, edit, delete, or view agents below.</p>

      <div className="agents-sections">

        {/* Add Agent */}
        <section className="agent-section">
          <h2>Add Agent</h2>
          <input type="text" placeholder="Name" value={addName} onChange={(e) => setAddName(e.target.value)} />
          <input type="email" placeholder="Email" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} />
          <input type="text" placeholder="Phone" value={addPhone} onChange={(e) => setAddPhone(e.target.value)} />
          <input type="text" placeholder="City" value={addCity} onChange={(e) => setAddCity(e.target.value)} />
          <label>
            <input type="checkbox" checked={addApproved} onChange={(e) => setAddApproved(e.target.checked)} />
            Approved
          </label>
          <button className="action-btn add-btn" onClick={handleAddAgent}>Add Agent</button>
        </section>

        {/* Edit Agent */}
        <section className="agent-section">
          <h2>Edit Agent</h2>
          <input type="text" placeholder="Agent ID" value={editAgentId} onChange={(e) => setEditAgentId(e.target.value)} />
          <input type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type="email" placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          <input type="text" placeholder="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
          <input type="text" placeholder="City" value={editCity} onChange={(e) => setEditCity(e.target.value)} />
          <label>
            <input type="checkbox" checked={editApproved} onChange={(e) => setEditApproved(e.target.checked)} />
            Approved
          </label>
          <button className="action-btn" onClick={handleEditAgent}>Update Agent</button>
        </section>

        {/* Delete Agent */}
        <section className="agent-section">
          <h2>Delete Agent</h2>
          <input type="text" placeholder="Agent ID" value={deleteAgentId} onChange={(e) => setDeleteAgentId(e.target.value)} />
          <input type="text" placeholder="Or Name" value={deleteAgentName} onChange={(e) => setDeleteAgentName(e.target.value)} />
          <button className="action-btn delete-btn" onClick={handleDeleteAgent}>Delete Agent</button>
        </section>

        {/* View/Search Agents */}
        <section className="agent-section view-section">
          <h2>View/Search Agents</h2>
          <input type="text" placeholder="Search by ID, Name or City" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="agents-list">
            {filteredAgents.length === 0 ? (
              <p>No agents found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map(a => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.email}</td>
                      <td>{a.phone}</td>
                      <td>{a.city}</td>
                      <td>{a.approved ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
    </AdminLayout>
  );
};

export default ManageAgents;

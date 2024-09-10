import React, { useState, useEffect } from 'react';
import { getAllRegistrations, createRegistration, updateRegistration, deleteRegistration } from '../services/registrationService'; 

const Registration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [newRegistration, setNewRegistration] = useState({ eventId: '', attendeeId: '', registrationDate: '' });
  const [editingRegistrationId, setEditingRegistrationId] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const fetchedRegistrations = await getAllRegistrations();
    setRegistrations(fetchedRegistrations);
  };

  const handleCreateRegistration = async () => {
    await createRegistration(newRegistration);
   setNewRegistration({ eventId: '', attendeeId: '', registrationDate: '' });;
    fetchRegistrations();
  };

  const handleUpdateRegistration = async (id) => {
    await updateRegistration(id, newRegistration);
    setEditingRegistrationId(null);
    fetchRegistrations();
  };

  const handleDeleteRegistration = async (id) => {
    await deleteRegistration(id);
    fetchRegistrations();
  };

  return (
    <div className="container mt-4">
      <h2>Registrations</h2>
      <div className="mb-3">
        <form>
          <div className="form-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Event ID"
              value={newRegistration.eventId}
              onChange={(e) => setNewRegistration({ ...newRegistration, eventId: e.target.value })}
              required
              min="1"
            />
            <div className="invalid-feedback">Please enter a valid Event ID.</div>
          </div>
          <div className="form-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Attendee ID"
              value={newRegistration.attendeeId}
              onChange={(e) => setNewRegistration({ ...newRegistration, attendeeId: e.target.value })}
              required
              min="1"
            />
            <div className="invalid-feedback">Please enter a valid Attendee ID.</div>
          </div>
          <div className="form-group mb-2">
            <input
              type="date"
              className="form-control"
              placeholder="Registration Date"
              value={newRegistration.registrationDate}
              onChange={(e) => setNewRegistration({ ...newRegistration, registrationDate: e.target.value })}
              required
            />
            <div className="invalid-feedback">Please select a valid registration date.</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              editingRegistrationId
                ? handleUpdateRegistration(editingRegistrationId)
                : handleCreateRegistration();
            }}
          >
            {editingRegistrationId ? 'Update Registration' : 'Create Registration'}
          </button>
        </form>
      </div>
      <ul className="list-group">
        {registrations.map((registration) => (
          <li
            key={registration.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              Event ID: {registration.eventId} - Attendee ID: {registration.attendeeId} - Date: {registration.registrationDate}
            </span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditingRegistrationId(registration.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteRegistration(registration.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}  

export default Registration;

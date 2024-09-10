import React, { useEffect, useState } from 'react';
import { getAllAttendees, createAttendee, updateAttendee, deleteAttendee } from '../services/attendeeService';

const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
    const [editAttendee, setEditAttendee] = useState(null);

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            const data = await getAllAttendees();
            setAttendees(data);
        } catch (error) {
            console.error('Failed to fetch attendees:', error);
        }
    };

    const handleCreateAttendee = async () => {
        try {
            await createAttendee(newAttendee);
            setNewAttendee({ name: '', email: '' }); // Clear input fields
            fetchAttendees();
        } catch (error) {
            console.error('Failed to create attendee:', error);
        }
    };

    const handleUpdateAttendee = async (attendee) => {
        try {
            await updateAttendee(attendee.id, attendee);
            fetchAttendees();
        } catch (error) {
            console.error('Failed to update attendee:', error);
        }
    };

    const handleDeleteAttendee = async (id) => {
        try {
            await deleteAttendee(id);
            fetchAttendees();
        } catch (error) {
            console.error('Failed to delete attendee:', error);
        }
    };

    return (
        <div className="container mt-4">
        <h1>Attendees</h1>
        <ul className="list-group mb-3">
          {attendees.map((attendee) => (
            <li
              key={attendee.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {attendee.name} - {attendee.email}
              </span>
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeleteAttendee(attendee.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setEditAttendee(attendee)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      
        <h2>{editAttendee ? 'Edit Attendee' : 'Add Attendee'}</h2>
        <form>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={editAttendee ? editAttendee.name : newAttendee.name}
              onChange={(e) =>
                editAttendee
                  ? setEditAttendee({ ...editAttendee, name: e.target.value })
                  : setNewAttendee({ ...newAttendee, name: e.target.value })
              }
              required
              minLength="2"
            />
            <div className="invalid-feedback">Please enter a valid name with at least 2 characters.</div>
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={editAttendee ? editAttendee.email : newAttendee.email}
              onChange={(e) =>
                editAttendee
                  ? setEditAttendee({ ...editAttendee, email: e.target.value })
                  : setNewAttendee({ ...newAttendee, email: e.target.value })
              }
              required
            />
            <div className="invalid-feedback">Please enter a valid email address.</div>
          </div>
          {editAttendee ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleUpdateAttendee(editAttendee);
              }}
            >
              Update Attendee
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleCreateAttendee();
              }}
            >
              Add Attendee
            </button>
          )}
        </form>
      </div>
      
    );
};

export default Attendees;


import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService'; 

const Event = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', location: '' });
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const fetchedEvents = await getAllEvents();
    setEvents(fetchedEvents);
  };

  const handleCreateEvent = async () => {
    await createEvent(newEvent);
    setNewEvent({ name: '', description: '', date: '', location: '' });
    fetchEvents();
  };

  const handleUpdateEvent = async (id) => {
    await updateEvent(id, newEvent);
    setEditingEventId(null);
    fetchEvents();
  };

  const handleDeleteEvent = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <div className="container">
    <h2 className="mb-4">Events</h2>
    <div className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Name"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Description"
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        required
      />
      <input
        type="date"
        className="form-control mb-2"
        placeholder="Date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Location"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        required
      />
      <button
        className="btn btn-primary"
        onClick={editingEventId ? () => handleUpdateEvent(editingEventId) : handleCreateEvent}
      >
        {editingEventId ? 'Update Event' : 'Create Event'}
      </button>
    </div>
    <ul className="list-group">
      {events.map((event) => (
        <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
          {event.name} - {event.description} - {event.date} - {event.location}
          <div>
            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingEventId(event.id)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Event;

import axios from 'axios';

const API_URL = 'https://localhost:7072/api/events'; // Update with your API base URL

export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};

export const createEvent = async (newEvent) => {
    try {
        const response = await axios.post(API_URL, newEvent, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const updateEvent = async (id, updatedEvent) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedEvent, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

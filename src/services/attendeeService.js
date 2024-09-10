import axios from 'axios';

const API_URL = 'https://localhost:7072/api/attendees'; // Update with your API base URL

export const getAllAttendees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendees:', error);
        throw error;
    }
};

export const getAttendeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendee:', error);
        throw error;
    }
};

export const createAttendee = async (newAttendee) => {
    try {
        const response = await axios.post(API_URL, newAttendee, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating attendee:', error);
        throw error;
    }
};

export const updateAttendee = async (id, updatedAttendee) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedAttendee, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating attendee:', error);
        throw error;
    }
};

export const deleteAttendee = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting attendee:', error);
        throw error;
    }
};

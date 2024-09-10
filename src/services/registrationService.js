import axios from 'axios';

const API_URL = 'https://localhost:7072/api/registrations'; // Update with your API base URL

export const getAllRegistrations = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching registrations:', error);
        throw error;
    }
}; 

export const getRegistrationById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching registration:', error);
        throw error;
    }
};

export const createRegistration = async (newRegistration) => {
    try {
        const response = await axios.post(API_URL, newRegistration, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating registration:', error);
        throw error;
    }
};

export const updateRegistration = async (id, updatedRegistration) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedRegistration, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating registration:', error);
        throw error;
    }
};

export const deleteRegistration = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting registration:', error);
        throw error;
    }
};

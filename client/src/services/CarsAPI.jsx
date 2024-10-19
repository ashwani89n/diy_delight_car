const API_BASE_URL = '/api';

const getAllCars = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getCarById =async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch car with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getExteriors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/exteriors`);
        if (!response.ok) {
            throw new Error('Failed to fetch exterior');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getExteriorById =async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/exteriors/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getInteriors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/interiors`);
        if (!response.ok) {
            throw new Error('Failed to fetch interior');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getInteriorById =async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/interiors/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getRoofs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/roofs`);
        if (!response.ok) {
            throw new Error('Failed to fetch interior');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getRoofById =async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/roofs/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getWheels = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/wheels`);
        if (!response.ok) {
            throw new Error('Failed to fetch interior');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getWheelById =async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/wheels/${id}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getAllCars, getCarById, getExteriors, getExteriorById, getInteriors, getInteriorById , getRoofs, getRoofById, getWheels, getWheelById};

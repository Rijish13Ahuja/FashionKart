import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; 

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const updateUserStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    console.log(`User with ID: ${id} successfully updated to status: ${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID: ${id}:`, error);
    throw new Error(`Failed to update user with ID: ${id}`);
  }
};


export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

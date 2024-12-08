import axios from 'axios';

const API_URL = 'http://localhost:3000/orders'; 

// Fetch orders for the given userId
export const getAllOrders = async (userId: string) => {
  try {
    // Pass the userId as a query parameter in the GET request
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data; // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return an empty array in case of error
  }
};

// Update the status of an order
export const updateOrderStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

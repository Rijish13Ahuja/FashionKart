import axios from 'axios';

const API_URL = 'http://localhost:3000/orders';

export const getAllOrders = async (userId?: string) => {
  try {
    const url = userId ? `${API_URL}?userId=${userId}` : API_URL; // Fetch all orders if no userId
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};


export const updateOrderStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

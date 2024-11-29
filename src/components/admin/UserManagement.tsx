import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserStatus, deleteUser } from '../../services/UserService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    await updateUserStatus(id, status);
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status } : user
      )
    );
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">User: {user.name}</h3>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Status: {user.status}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateStatus(user.id, 'Active')}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(user.id, 'Inactive')}
                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

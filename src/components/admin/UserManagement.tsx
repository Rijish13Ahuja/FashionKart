import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserStatus, deleteUser } from '../../services/UserService';
import { userValidationSchema } from '../admin/validations/userValidations';
import { FaCheckCircle, FaBan, FaTrash } from 'react-icons/fa';
import * as Yup from 'yup';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"activate" | "deactivate" | "delete" | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const validateUserAction = async (user: any, status?: string) => {
    try {
      await userValidationSchema.validate({
        name: user.name,
        email: user.email,
        status: status || user.status,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert(`Validation Error: ${error.message}`);
        throw error;
      }
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    const userToUpdate = users.find((user) => user.id === id);

    if (userToUpdate) {
      try {
        await validateUserAction(userToUpdate, status);
        await updateUserStatus(id, status);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status } : user
          )
        );
      } catch (error) {
        console.error('Update status failed:', error);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    const userToDelete = users.find((user) => user.id === id);

    if (userToDelete) {
      try {
        await validateUserAction(userToDelete);
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Delete user failed:', error);
      }
    }
  };

  const showConfirmationModal = (action: "activate" | "deactivate" | "delete", userId: number, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setModalAction(action);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalAction && selectedUserId !== null) {
      if (modalAction === "delete") {
        handleDeleteUser(selectedUserId);
      } else {
        const newStatus = modalAction === "activate" ? "Active" : "Inactive";
        handleUpdateStatus(selectedUserId, newStatus);
      }
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
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
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  User: {user.name}
                </h3>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Status: {user.status}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => showConfirmationModal("activate", user.id, user.name)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <FaCheckCircle className="mr-2" /> Activate
                  </button>
                  <button
                    onClick={() => showConfirmationModal("deactivate", user.id, user.name)}
                    className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                  >
                    <FaBan className="mr-2" /> Deactivate
                  </button>
                  <button
                    onClick={() => showConfirmationModal("delete", user.id, user.name)}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 transform scale-100 opacity-100 transition-transform duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Are you sure you want to {modalAction} {selectedUserName}?
            </h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleModalConfirm}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              >
                Yes, Confirm
              </button>
              <button
                onClick={handleModalCancel}
                className="w-full bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

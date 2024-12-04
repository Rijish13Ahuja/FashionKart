import React, { useState, useEffect } from 'react';
import { profileValidationSchema } from '../../utils/ProfileValidations'; // Import the validation schema
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string[];
}

const Profile: React.FC = () => {
  const [tab, setTab] = useState<'personal' | 'address' | 'settings'>('personal');
  const [user, setUser] = useState<User | null>(null);
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setNotifications({
        email: parsedUser.notifications?.email || true,
        sms: parsedUser.notifications?.sms || false,
      });
    }
  }, []);

  const handleSavePhone = async () => {
    try {
      await profileValidationSchema.validate({ phone: newPhone });
      if (!user) return;
      const updatedUser = { ...user, phone: newPhone };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditingPhone(false);
      toast.success('Phone number updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddAddress = async () => {
    try {
      await profileValidationSchema.validate({ address: newAddress });
      if (!user || !newAddress.trim()) return;
      const updatedUser = { ...user, address: [...(user.address || []), newAddress] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setNewAddress('');
      toast.success('Address added successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      await profileValidationSchema.validate({
        newPassword,
        confirmNewPassword,
      });
      if (!user) return;
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success('Password changed successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteAddress = (index: number) => {
    if (!user) return;
    const updatedAddresses = user.address?.filter((_, i) => i !== index) || [];
    const updatedUser = { ...user, address: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.info('Address removed successfully.');
  };

  const handleToggleNotifications = (type: 'email' | 'sms') => {
    const updatedNotifications = { ...notifications, [type]: !notifications[type] };
    setNotifications(updatedNotifications);
    if (user) {
      const updatedUser = { ...user, notifications: updatedNotifications };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Notification preferences updated!');
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No user is logged in. Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-6 border-b">
          <button
            className={`flex-1 text-center py-2 ${
              tab === 'personal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setTab('personal')}
          >
            Personal Info
          </button>
          <button
            className={`flex-1 text-center py-2 ${
              tab === 'address' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setTab('address')}
          >
            Address Book
          </button>
          <button
            className={`flex-1 text-center py-2 ${
              tab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setTab('settings')}
          >
            Account Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {tab === 'personal' && (
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <p className="mt-2">
                Name: <span className="font-medium">{user.name}</span>
              </p>
              <p className="mt-2">
                Phone:{' '}
                {editingPhone ? (
                  <>
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <button
                      onClick={handleSavePhone}
                      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {user.phone || 'Not provided'}{' '}
                    <button
                      onClick={() => {
                        setEditingPhone(true);
                        setNewPhone(user.phone || '');
                      }}
                      className="text-blue-500 underline ml-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </p>
              <p className="mt-2">
                Email: <span className="font-medium">{user.email}</span>
              </p>
            </div>
          )}
          {tab === 'address' && (
            <div>
              <h3 className="text-lg font-medium">Address Book</h3>
              <ul className="mt-2 space-y-2">
                {user.address?.map((addr, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {addr}
                    <button
                      onClick={() => handleDeleteAddress(index)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Add new address"
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleAddAddress}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
          {tab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium">Account Settings</h3>
              <div className="mt-4">
                <h4 className="font-medium">Change Password</h4>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="border p-2 rounded w-full mt-2"
                />
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="border p-2 rounded w-full mt-2"
                />
                <button
                  onClick={handleChangePassword}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Change Password
                </button>
              </div>
              <div className="mt-6">
                <h4 className="font-medium">Notification Preferences</h4>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleToggleNotifications('email')}
                    className="mr-2"
                  />
                  <label>Email Notifications</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => handleToggleNotifications('sms')}
                    className="mr-2"
                  />
                  <label>SMS Notifications</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

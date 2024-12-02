import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [tab, setTab] = useState<'personal' | 'address' | 'settings'>('personal');

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
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">johndoe@example.com</p>
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
              <p className="mt-2">Name: John Doe</p>
              <p className="mt-1">Phone: +123 456 7890</p>
              <p className="mt-1">Email: johndoe@example.com</p>
            </div>
          )}
          {tab === 'address' && (
            <div>
              <h3 className="text-lg font-medium">Address Book</h3>
              <ul className="mt-2">
                <li>123 Main Street, New York, NY</li>
                <li>456 Park Avenue, Los Angeles, CA</li>
              </ul>
            </div>
          )}
          {tab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="mt-2">Change Password</p>
              <p className="mt-1">Notification Preferences</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

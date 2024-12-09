import React, { useState } from 'react';
import { settingsValidationSchema } from '../../utils/SettingsValidations';
import { toast } from 'react-toastify';

const Settings: React.FC = () => {
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+123 456 7890');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: false,
  });
  const [privacy, setPrivacy] = useState({
    activityRecommendations: true,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await settingsValidationSchema.validate({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await settingsValidationSchema.validate({
        email,
        phone,
        notifications,
        privacy,
      });
      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="orderUpdates"
                checked={notifications.orderUpdates}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    orderUpdates: !prev.orderUpdates,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="orderUpdates" className="text-sm">
                Receive notifications for order updates
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="promotionalEmails"
                checked={notifications.promotionalEmails}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    promotionalEmails: !prev.promotionalEmails,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="promotionalEmails" className="text-sm">
                Receive promotional emails
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="activityRecommendations"
                checked={privacy.activityRecommendations}
                onChange={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    activityRecommendations: !prev.activityRecommendations,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="activityRecommendations" className="text-sm">
                Show recommendations based on my activity
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

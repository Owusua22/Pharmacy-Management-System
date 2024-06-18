// UpdateProfilePage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Input } from '@material-tailwind/react';
import { update } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { message } from 'antd';

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword.length < 8) {
      message.error('New password must be at least 8 characters long');
      return;
    }

    const updatedUser = { username, email, oldPassword, newPassword };
    const userId = user._id;
    const resultAction = await dispatch(update({ userData: updatedUser, userId }));
    if (update.fulfilled.match(resultAction)) {
      message.success('Profile updated successfully');
      navigate('/');
    } else {
      message.error('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center mt-2">
      <div className="flex items-center mb-2">
        <img src="/logo.avif" alt="logo" className="w-16 h-16" />
        <Typography variant="h3" color="blue" className="text-center ml-2">
          City Central Pharmacy
        </Typography>
      </div>
      <FaUserCircle className="text-8xl text-blue-500 mb-4" />
      <Typography variant="h4" color="blue-gray" className="text-center mb-4">
        Update Profile
      </Typography>
      <form onSubmit={handleUpdate} className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            size="lg"
            className="bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="lg"
            className="bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            size="lg"
            className="bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            size="lg"
            className="bg-gray-100"
          />
        </div>
        
        {error && (
          <Typography variant="small" color="red" className="mb-4">
            {error}
          </Typography>
        )}
        <Button type="submit" color="green" fullWidth disabled={loading} size="lg">
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;

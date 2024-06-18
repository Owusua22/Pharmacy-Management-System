// src/Components/AdminNavbar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Menu, Dropdown, Modal, Image } from 'antd';
import { logout } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const AdminNavbar = () => {
  const [logoutConfirmOpen, setLogoutConfirmOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setLogoutConfirmOpen(false);
    navigate("/");
  };

  const initial = user.username.charAt(0).toUpperCase();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate('/update-profile')}>
        Update Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="px-4 py-2 sticky top-0 z-10 flex items-center justify-between bg-blue-500">
      <div className="flex items-center">
        <Image
          src="/logo.avif"  // Update with the correct path to your logo
          width={50}
          preview={false}
        />
        <Typography.Title level={3} className="text-white m-0 text-center ml-2">
          City Central Pharmacy
        </Typography.Title>
      </div>
      <div className="flex items-center">
        <div className="flex items-center bg-gray-300 text-blue-600 rounded-full h-10 w-10 justify-center mr-2 text-xl font-bold">
          {initial}
        </div>
        <Typography.Text className="text-white mr-4 font-bold">
          Hello, {user.username}
        </Typography.Text>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text" icon={<UserOutlined />} style={{ color: 'white' }} />
        </Dropdown>
      </div>
      <Modal
        title="Confirm Logout"
        visible={logoutConfirmOpen}
        onOk={confirmLogout}
        onCancel={() => setLogoutConfirmOpen(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default AdminNavbar;

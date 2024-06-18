import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Input, message } from 'antd';
import { register } from '../Redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      message.error('Password must be at least 8 characters long.');
      return;
    }

    const resultAction = await dispatch(register({ username, email, password }));

    if (register.fulfilled.match(resultAction)) {
      message.success('Registration successful!');
      navigate('/login');
    } else {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center mt-4">
      <div className="flex items-center mb-2">
        <img src="/logo.avif" alt="logo" className="w-16 h-16" />
        <Title level={3} className="text-center text-blue-500 ml-4">
          City Central Pharmacy
        </Title>
      </div>
      <Paragraph className="text-center mb-8 text-blue-gray-500">
        The City Central Pharmacy Management System
      </Paragraph>
      <div className="text-8xl mb-4 bg-gradient-to-r from-blue-300 to-green-300 p-8 rounded-full">
        <FaUserAlt />
      </div>
      <form onSubmit={handleRegister} className="max-w-md w-full">
        <div className="mb-4">
          <Input
            type="text"
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            size="large"
            className="bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            prefix={<MdOutlineMailOutline />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="large"
            className="bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="large"
            className="bg-gray-100"
          />
        </div>
        <Button type="primary" htmlType="submit" block loading={loading} size="large" className="bg-green-500 hover:bg-green-600">
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className="mt-4 text-center">
          <Paragraph>
            Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </Paragraph>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

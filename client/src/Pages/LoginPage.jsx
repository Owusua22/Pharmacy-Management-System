import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Input } from "@material-tailwind/react";
import { login } from "../Redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaUserAlt } from "react-icons/fa";
import { message } from "antd";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ username, password }));
      console.log("resultAction:", resultAction); // Debug log
      if (login.fulfilled.match(resultAction)) {
        message.success('Login successful');
        navigate("/");
      } else {
        message.error('Invalid credentials. Please try again.');
      }
    } catch (err) {
      message.error("Failed to login. Please try again.");
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center mt-11">
      <div className="flex items-center mb-2">
        <img src="/logo.avif" alt="logo" className="w-16 h-16" />
        <Typography variant="h3" color="blue" className="text-center">
          City Central Pharmacy
        </Typography>
      </div>
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="text-center mb-8"
      >
        The City Central Pharmacy Management System
      </Typography>
      <div className="text-8xl mb-4 bg-gradient-to-r from-blue-300 to-green-300 p-8 rounded-full">
        <FaUserAlt />
      </div>

      <form onSubmit={handleLogin} className="max-w-md w-full">
        <div className="mb-4">
          <Input
            type="text"
            icon={<FaUser />}
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
            type="password"
            icon={<FaLock />}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="lg"
            className="bg-gray-100"
          />
        </div>
        {error && (
          <Typography variant="small" color="red" className="mb-4">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          color="green"
          fullWidth
          disabled={loading}
          size="lg"
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
        <div className="mt-4 text-center">
          <Typography variant="small" color="blue-gray">
            New User?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

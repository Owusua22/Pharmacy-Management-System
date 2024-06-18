import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { logout } from "../Redux/userSlice";
import {  FaBars, FaTimes } from "react-icons/fa";

export const StickyNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setLogoutConfirmOpen(false);
    navigate("/");
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-bold ${
          location.pathname === "/" ? "text-white" : ""
        }`}
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-bold ${
          location.pathname === "/products" ? "text-white" : ""
        }`}
      >
        <Link to="/products" className="flex items-center">
          Products
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2 bg-blue-400">
      <div className="flex items-center justify-between text-white">
        <Link to="/" className="flex items-center">
          <img src="/logo.avif" alt="logo" className="w-8 h-8 mr-2" />
          <Typography variant="h5" className="text-white">
            City Central Pharmacy
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1 lg:hidden">
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <div className="hidden lg:flex items-center gap-x-1">
            {user ? (
              <>
                <Menu>
                  <MenuHandler>
                    <Button variant="text" className="flex items-center">
                      <div className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <Typography
                        variant="small"
                        className="p-1 font-normal ml-2 text-white"
                      >
                        Hello, {user.username}
                      </Typography>
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem onClick={() => navigate('/update-profile')}>
                      Update Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {user && (
          <div className="mt-4 flex flex-col lg:hidden">
            <Button
              variant="text"
              className="flex items-center mb-6 text-white"
            >
              <div className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <Typography
                variant="small"
                className="p-1 font-normal ml-2 text-white"
              >
                Hello, {user.username}
              </Typography>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => navigate('/update-profile')}
              className="mb-2"
            >
              Update Profile
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        )}
        {!user && (
          <div className="mt-4 flex flex-col lg:hidden">
            <Link to="/login" className="mb-2">
              <Button variant="text" size="sm" className="text-white">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </Collapse>
      <Dialog open={logoutConfirmOpen} handler={setLogoutConfirmOpen}>
        <DialogHeader>Confirm Logout</DialogHeader>
        <DialogBody>
          Are you sure you want to log out?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => setLogoutConfirmOpen(false)}
            className="mr-4"
          >
            No
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={confirmLogout}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </Navbar>
  );
};

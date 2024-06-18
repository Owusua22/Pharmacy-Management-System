import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsPage from "./Pages/Products";
import NoPage from "./Pages/NoPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./Components/PrivateRoute";
import AdminPage from "./Pages/Admin/AdminPage";
import UpdateProfilePage from "./Pages/UpdateProfile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<NoPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }>
            <Route path="inventory" element={<AdminPage />} />
            <Route path="sales" element={<AdminPage />} />
            <Route path="prescription" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

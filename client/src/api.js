

import axios from "axios";

const backendBaseUrl = "http://localhost:5000";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

// Create an instance of Axios with custom headers
const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to update the token if it changes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    console.log('Request config:', config); // Add logging to inspect the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API functions
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/api/users/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/api/users/login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Save the token to localStorage
  }
  return response.data;
};

export const updateUser = async (userData, userId) => {
  const response = await axiosInstance.put(`/api/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/api/users/${userId}`);
  return response.data;
};


// Inventory API functions
export const fetchInventoriesAPI = () => {
  return axiosInstance.get("/api/inventory");
};

export const addInventoryAPI = (inventory) => {
  return axiosInstance.post("/api/inventory", inventory);
};

export const updateInventoryAPI = (id, inventory) => {
  return axiosInstance.put(`/api/inventory/${id}`, inventory);
};

export const deleteInventoryAPI = (id) => {
  return axiosInstance.delete(`/api/inventory/${id}`);
};

// Sales API functions
export const fetchSalesAPI = () => {
  return axiosInstance.get("api/sales");
};
export const addSalesAPI = (sale) => {
  return axiosInstance.post("/api/sales", sale);
};

export const updateSalesAPI = (id, sale) => {
  return axiosInstance.put(`/api/sales/${id}`, sale);
};

export const deleteSalesAPI = (id) => {
  return axiosInstance.delete(`/api/sales/${id}`);
};

// Prescription API functions
export const fetchPrescriptionsAPI = () => {
  return axiosInstance.get("api/prescriptions");
};
export const addPrescriptionsAPI = (prescription) => {
  return axiosInstance.post("/api/prescriptions", prescription);
};

export const updatePrescriptionsAPI = (id, prescription) => {
  return axiosInstance.put(`/api/prescriptions/${id}`, prescription);
};

export const deletePrescriptionsAPI = (id) => {
  return axiosInstance.delete(`/api/prescriptions/${id}`);
};

// Customer API functions
export const fetchCustomersAPI = () => {
  return axiosInstance.get("/api/customers");
};

export const fetchCustomerByNameAPI = (name) => {
  return axiosInstance.get(`/api/customers/${name}`);
};

export const addCustomerAPI = (customer) => {
  return axiosInstance.post("/api/customers", customer);
};

export const updateCustomerAPI = (id, customer) => {
  return axiosInstance.put(`/api/customers/${id}`, customer);
};

export const deleteCustomerAPI = (id) => {
  return axiosInstance.delete(`/api/customers/${id}`);
};

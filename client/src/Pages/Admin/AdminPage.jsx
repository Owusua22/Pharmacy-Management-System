// src/pages/Admin/AdminPage.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { fetchCustomers } from '../../Redux/customerSlice';
import { fetchInventories } from '../../Redux/inventorySlice';
import { fetchSales } from '../../Redux/salesSlice';
import { fetchPrescriptions } from '../../Redux/prescriptionsSlice';

import Sidebar from '../../Components/Sidebar';
import InventoryTable from '../../Components/Inventory/InventoryTable';
import SalesTable from '../../Components/Sales/SalesTable';
import PrescriptionTable from '../../Components/Prescription/PrescriptionTable';
import CustomerTable from '../../Components/Customers/CustomerTable';
import AdminNavbar from '../../Components/AdminNavbar';
import Reports from './Reports';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchInventories());
    dispatch(fetchSales());
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  const getTitle = () => {
    if (location.pathname.includes('/admin/inventory')) {
      return 'Manage Inventory';
    } else if (location.pathname.includes('/admin/sales')) {
      return 'Manage Sales';
    } else if (location.pathname.includes('/admin/customers')) {
      return 'Manage Customers';
    } else if (location.pathname.includes('/admin/prescription')) {
      return 'Manage Prescriptions';
    } else {
      return 'View Reports';
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-500">
        <AdminNavbar />
      </Header>
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Title level={2}>{getTitle()}</Title>
            <Routes>
              <Route path="/" element={<Navigate to="reports" />} />
              <Route path="inventory" element={<InventoryTable />} />
              <Route path="sales" element={<SalesTable />} />
              <Route path="prescription" element={<PrescriptionTable />} />
              <Route path="customers" element={<CustomerTable />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPage;

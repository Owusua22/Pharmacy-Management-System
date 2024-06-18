import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  LogoutOutlined,
  UserOutlined ,
  LineChartOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Clear the token from storage (assuming localStorage is used)
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/login'; // Adjust the path as needed
  };

  return (
    <Sider width={170} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
      >
         <Menu.Item key="/admin/reports" icon={ <LineChartOutlined />}>
          <Link to="/admin/reports">Reports</Link>
        </Menu.Item>
        <Menu.Item key="/admin/customers" icon={<UserOutlined />}>
          <Link to="/admin/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="/admin/inventory" icon={<DashboardOutlined />}>
          <Link to="/admin/inventory">Inventory</Link>
        </Menu.Item>
        <Menu.Item key="/admin/sales" icon={<FileTextOutlined />}>
          <Link to="/admin/sales">Sales</Link>
        </Menu.Item>
        <Menu.Item key="/admin/prescription" icon={<MedicineBoxOutlined />}>
          <Link to="/admin/prescription">Prescription</Link>
        </Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message, Modal, Spin, Input } from 'antd';
import { fetchCustomers, deleteCustomer, addCustomer, updateCustomer } from '../../Redux/customerSlice';
import CustomerForm from './CustomerForm';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { customers, status, error } = useSelector((state) => state.customers);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCustomers(
      customers
        .filter(customer => 
          customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          customer._id.includes(searchText)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [customers, searchText]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCustomer(id)).unwrap();
      message.success('Customer deleted successfully');
    } catch (error) {
      message.error('Failed to delete customer');
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (customerData) => {
    try {
      if (editingCustomer) {
        await dispatch(updateCustomer({ id: editingCustomer._id, customer: customerData })).unwrap();
        message.success('Customer updated successfully');
      } else {
        await dispatch(addCustomer(customerData)).unwrap();
        message.success('Customer added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save customer');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => text.slice(-5),
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
    <div className="flex items-center justify-between mb-4 px-4">
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAdd}
      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Add Customer
    </Button>
  
    <Input
      placeholder="Search by Name or ID"
      prefix={<SearchOutlined />}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-64 p-2 border rounded-lg sm:w-48 md:w-56 lg:w-64" // Responsive widths
    />
    
 
</div>


      
      {status === 'loading' ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
      <Modal
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CustomerForm
          customer={editingCustomer}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default CustomerTable;

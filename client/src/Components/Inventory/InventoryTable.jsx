import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message, Modal, Spin, Input } from 'antd';
import { fetchInventories, deleteInventory, addInventory, updateInventory } from '../../Redux/inventorySlice';
import InventoryForm from './InventoryForm';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const InventoryTable = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.inventory);
  const [editingInventory, setEditingInventory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchInventories());
  }, [dispatch]);

  useEffect(() => {
    const sortedItems = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (searchText) {
      const filtered = sortedItems.filter(
        item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item._id.includes(searchText)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(sortedItems);
    }
  }, [searchText, items]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteInventory(id)).unwrap();
      message.success('Inventory deleted successfully');
    } catch (error) {
      message.error('Failed to delete inventory');
    }
  };

  const handleEdit = (inventory) => {
    setEditingInventory(inventory);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingInventory(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingInventory) {
        await dispatch(updateInventory({ id: editingInventory._id, inventory: formData })).unwrap();
        message.success('Inventory updated successfully');
      } else {
        await dispatch(addInventory(formData)).unwrap();
        message.success('Inventory added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save inventory');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => text.substring(text.length - 5),  // Display last 5 characters
    },
    { title: 'Product', dataIndex: 'name', key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (text) => new Date(text).toISOString().split('T')[0],  // Format date without time
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add Inventory
        </Button>
        <Input
          placeholder="Search by Product Name or ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64 p-2 border rounded-lg sm:w-48 md:w-56 lg:w-64"
        />
      </div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="_id"
          pagination={{ pageSize: 4, position: ['bottomCenter'] }}
        />
      )}
      <Modal
        title={editingInventory ? 'Edit Inventory' : 'Add Inventory'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <InventoryForm
          inventory={editingInventory}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default InventoryTable;

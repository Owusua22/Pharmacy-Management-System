import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message, Modal, Spin, Input } from 'antd';
import { fetchSales, deleteSale } from '../../Redux/salesSlice';
import SalesForm from './SalesForm';
import { EditOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import PrintReceipt from './PrintReceipt';

const SalesTable = () => {
  const dispatch = useDispatch();
  const { sales, status, error } = useSelector((state) => state.sales);
  const [editingSale, setEditingSale] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    let filteredData = [...sales]; // Create a shallow copy to avoid direct mutation

    if (searchText) {
      filteredData = sales.filter(
        sale => sale.customerName.toLowerCase().includes(searchText.toLowerCase()) || sale._id.includes(searchText)
      );
    }

    // Sort by createdAt in descending order
    filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredSales(filteredData);
  }, [searchText, sales]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSale(id)).unwrap();
      message.success('Sale deleted successfully');
      dispatch(fetchSales()); // Refresh sales after deletion
    } catch (error) {
      message.error('Failed to delete sale');
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingSale(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    setIsModalVisible(false);
    dispatch(fetchSales());
    // Do something with the values
    console.log(values);
  }

  const handlePrint = (sale) => {
    setSelectedSale(sale);
    setTimeout(() => {
      handlePrintReceipt();
    }, 0);
  };

  const handlePrintReceipt = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Receipt',
  });

  const columns = [
    {
      title: 'Sale ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => text.substring(text.length - 5), // Display last 5 characters
    },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Items', dataIndex: 'items', key: 'items', render: (items) => (
        <ul>
          {items && items.map((item) => (
            <li key={item._id}>{`${item.name} (qty:${item.quantity}pcs , Ghc${item.price}per unit)`}</li>
          ))}
        </ul>
      )
    },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (date) => moment(date).format('YYYY-MM-DD') },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
          <Button type="link" icon={<PrinterOutlined />} onClick={() => handlePrint(record)}>Print</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4 px-4">
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add Sale
        </Button>
        <Input
          placeholder="Search by Customer Name or ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64 p-2 border rounded-lg sm:w-48 md:w-56 lg:w-64"
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
          dataSource={filteredSales}
          rowKey="_id"
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
 
        />
      )}
      <Modal
        title={editingSale ? 'Edit Sale' : 'Add Sale'}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <SalesForm
          sale={editingSale}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
      {selectedSale && (
        <div style={{ display: 'none' }}>
          <PrintReceipt
            ref={printRef}
            cart={selectedSale.items}
            totalAmount={selectedSale.totalAmount}
            customerName={selectedSale.customerName}
            date={moment(selectedSale.date).format('YYYY-MM-DD')}
          />
        </div>
      )}
    </>
  );
};

export default SalesTable;

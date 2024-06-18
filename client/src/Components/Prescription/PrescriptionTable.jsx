import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message, Modal, Input, Pagination, Spin } from 'antd';
import { fetchPrescriptions, deletePrescription, addPrescription, updatePrescription } from '../../Redux/prescriptionsSlice';
import PrescriptionForm from './PrescriptionForm';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const PrescriptionTable = () => {
  const dispatch = useDispatch();
  const { prescriptions, status, error } = useSelector((state) => state.prescriptions);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  useEffect(() => {
    const filtered = prescriptions.filter((prescription) => {
      const lowercasedText = searchText.toLowerCase();
      return (
        prescription.patientName.toLowerCase().includes(lowercasedText) ||
        prescription._id.slice(-5).includes(lowercasedText)
      );
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredPrescriptions(filtered);
  }, [searchText, prescriptions]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePrescription(id)).unwrap();
      message.success('Prescription deleted successfully');
    } catch (error) {
      message.error('Failed to delete prescription');
    }
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingPrescription(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (prescriptionData) => {
    try {
      if (editingPrescription) {
        await dispatch(updatePrescription({ id: editingPrescription._id, prescription: prescriptionData })).unwrap();
        message.success('Prescription updated successfully');
      } else {
        await dispatch(addPrescription(prescriptionData)).unwrap();
        message.success('Prescription added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save prescription');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => text.substring(text.length - 5), // Display last 5 characters
    },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Doctor Name', dataIndex: 'doctorName', key: 'doctorName' },
    { title: 'Medications', dataIndex: 'medication', key: 'medication', render: (medication) => (
        <ul>
          {medication && medication.map((med, index) => (
            <li key={index}>{`${med.name} (${med.dosage}, Qty: ${med.quantity})`}</li>
          ))}
        </ul>
      )
    },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (date) => new Date(date).toLocaleDateString() },
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Prescription
        </Button>
      
        <Input
          placeholder="Search by Patient Name or ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearchChange}
          style={{ width: 300 }}

          
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
          dataSource={filteredPrescriptions.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          rowKey="_id"
          pagination={false}
        />
      )}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPrescriptions.length}
        onChange={handleChangePage}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
      <Modal
        title={editingPrescription ? 'Edit Prescription' : 'Add Prescription'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <PrescriptionForm
          prescription={editingPrescription}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default PrescriptionTable;

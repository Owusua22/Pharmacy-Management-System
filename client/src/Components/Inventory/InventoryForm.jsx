import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const InventoryForm = ({ inventory, onSubmit, onClose }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (inventory && inventory.fileName) {
      setImageFile(inventory.fileName);
    }
    if (inventory) {
      form.setFieldsValue({
        ...inventory,
        expirationDate: moment(inventory.expirationDate),
      });
    } else {
      form.resetFields();
    }
  }, [inventory, form]);

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('quantity', values.quantity);
    formData.append('supplier', values.supplier);
    formData.append('expirationDate', values.expirationDate.format('YYYY-MM-DD'));
    formData.append('amount', values.amount);
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (inventory && inventory.fileName) {
      formData.append('fileName', inventory.fileName);
    }

    console.log('Form data submitted:', formData);

    onSubmit(formData);
    form.resetFields();
    setImageFile(null);
  };

 

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="supplier" label="Supplier" rules={[{ required: true, message: 'Please enter the supplier' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: 'Please select the expiration date' }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter the amount' }]}>
        <InputNumber min={1} />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {inventory ? 'Update Inventory' : 'Add Inventory'}
        </Button>
        <Button onClick={() => { onClose(); form.resetFields(); setImageFile(null); }} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

InventoryForm.propTypes = {
  inventory: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    supplier: PropTypes.string,
    expirationDate: PropTypes.string,
    amount: PropTypes.number,
    fileName: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InventoryForm;

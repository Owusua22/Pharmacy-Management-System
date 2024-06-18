import { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const CustomerForm = ({ customer, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  }, [customer, form]);

  const handleSubmit = async (values) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Location"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select the gender' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button onClick={() => { onClose(); form.resetFields(); }} style={{ marginRight: '8px' }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          {customer ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

CustomerForm.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    phone: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerForm;

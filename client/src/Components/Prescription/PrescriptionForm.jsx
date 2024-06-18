// src/components/PrescriptionTable/PrescriptionForm.jsx
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker, InputNumber, message,  Row, Col } from 'antd';
import { addPrescription, updatePrescription } from '../../Redux/prescriptionsSlice';
import PropTypes from 'prop-types';
import moment from 'moment';

const PrescriptionForm = ({ prescription, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (prescription) {
      form.setFieldsValue({
        patientName: prescription.patientName,
        doctorName: prescription.doctorName,
        medication: prescription.medication,
        date: moment(prescription.date),
      });
    } else {
      form.resetFields();
    }
  }, [prescription, form]);

  const handleSubmit = async (values) => {
    const prescriptionData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };

    try {
      if (prescription) {
        await dispatch(updatePrescription({ id: prescription._id, prescription: prescriptionData })).unwrap();
        message.success('Prescription updated successfully');
      } else {
        await dispatch(addPrescription(prescriptionData)).unwrap();
        message.success('Prescription added successfully');
      }
      onClose();
    } catch (error) {
      message.error('Failed to save prescription');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="patientName"
            label="Patient Name"
            rules={[{ required: true, message: 'Please enter the patient name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="doctorName"
            label="Doctor Name"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="medication">
        {(fields, { add, remove }) => (
          <>
           {fields.map((field) => (
             <Row gutter={16} key={field.key} align="baseline">
               <Col span={8}>
                 <Form.Item
                   {...field}
                   label="Drug Name"
                   name={[field.name, 'name']}
                   fieldKey={[field.fieldKey, 'name']}
                   rules={[{ required: true, message: 'Please enter the medication name' }]}
                 >
                   <Input />
                 </Form.Item>
               </Col>
                <Col span={6}>
                  <Form.Item
                    {...field}
                    label="Dosage"
                    name={[field.name, 'dosage']}
                    fieldKey={[field.fieldKey, 'dosage']}
                    rules={[{ required: true, message: 'Please enter the dosage' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...field}
                    label="Qty"
                    name={[field.name, 'quantity']}
                    fieldKey={[field.fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Please enter the quantity' }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button type="primary" danger onClick={() => remove(field.name)}    style={{ marginTop: "30px" }}>
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Medication
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date' }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button onClick={onClose} style={{ marginRight: '8px' }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          {prescription ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

PrescriptionForm.propTypes = {
  prescription: PropTypes.shape({
    _id: PropTypes.string,
    patientName: PropTypes.string.isRequired,
    doctorName: PropTypes.string,
    medication: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        dosage: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PrescriptionForm;

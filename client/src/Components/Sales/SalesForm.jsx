/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  message,
  Row,
  Col,
} from "antd";
import { addSale, updateSale } from "../../Redux/salesSlice";
import PropTypes from "prop-types";
import moment from "moment";

const SalesForm = ({ sale, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sale) {
      form.setFieldsValue({
        customerName: sale.customerName,
        items: sale.items,
        totalAmount: sale.totalAmount,
        date: moment(sale.date),
      });
    } else {
      form.resetFields();
    }
  }, [sale, form]);

  const handleSubmit = async (values) => {
    const saleData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    try {
      if (sale) {
        await dispatch(updateSale({ id: sale._id, sale: saleData })).unwrap();
        message.success("Sale updated successfully");
      } else {
        await dispatch(addSale(saleData)).unwrap();
        message.success("Sale added successfully");
      }
      onClose();
    } catch (error) {
      message.error("Failed to save sale");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[
              { required: true, message: "Please enter the customer name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row gutter={16} key={field.key} align="baseline">
                <Col span={8}>
                  <Form.Item
                    {...field}
                    label="Drug"
                    name={[field.name, "name"]}
                    fieldKey={[field.fieldKey, "name"]}
                    rules={[
                      { required: true, message: "Please enter the item name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...field}
                    label="Quantity"
                    name={[field.name, "quantity"]}
                    fieldKey={[field.fieldKey, "quantity"]}
                    rules={[
                      { required: true, message: "Please enter the quantity" },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...field}
                    label="Unit Price"
                    name={[field.name, "price"]}
                    fieldKey={[field.fieldKey, "price"]}
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                </Col>

                <Col span={2}>
                  <Button
                    type="primary"
                    danger
                    onClick={() => remove(field.name)}
                    style={{ marginTop: "30px" }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="totalAmount"
            label="Total Amount"
            rules={[
              { required: true, message: "Please enter the total amount" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button onClick={onClose} style={{ marginRight: "8px" }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          {sale ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

SalesForm.propTypes = {
  sale: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default SalesForm;

import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../Redux/customerSlice';
import { fetchPrescriptions } from '../../Redux/prescriptionsSlice';
import { fetchSales } from '../../Redux/salesSlice';
import { fetchInventories } from '../../Redux/inventorySlice';
import { Card, Col, Row, Spin, Button } from 'antd';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Reports = () => {
  const dispatch = useDispatch();
  const reportRef = useRef(null);

  const customers = useSelector((state) => state.customers);
  const prescriptions = useSelector((state) => state.prescriptions);
  const sales = useSelector((state) => state.sales);
  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchPrescriptions());
    dispatch(fetchSales());
    dispatch(fetchInventories());
  }, [dispatch]);

  useEffect(() => {
    console.log('Customers:', customers.customers);
    console.log('Prescriptions:', prescriptions.prescriptions);
    console.log('Sales:', sales.sales);
    console.log('Inventory:', inventory.items);
  }, [customers, prescriptions, sales, inventory]);

  const renderLoading = () => (
    <div className="text-center p-5">
      <Spin size="large" />
    </div>
  );

  const renderError = (error) => (
    <div className="text-center text-red-500 p-5">
      {error}
    </div>
  );

  const getDataLength = (data) => (Array.isArray(data) ? data.length : 0);

  const salesData = useMemo(() => {
    if (!Array.isArray(sales.sales)) return [];

    const dailySales = sales.sales.reduce((acc, sale) => {
      const date = moment(sale.date).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = { date, totalAmount: 0 };
      }
      acc[date].totalAmount += sale.totalAmount;
      return acc;
    }, {});

    return Object.values(dailySales);
  }, [sales.sales]);

  const inventoryData = Array.isArray(inventory.items) ? inventory.items : [];

  const downloadReport = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('report.pdf');
  };

  return (
    <div className="p-5">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total Customers" bordered={false}>
            {customers.status === 'loading' ? renderLoading() : customers.error ? renderError(customers.error) : getDataLength(customers.customers)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Prescriptions" bordered={false}>
            {prescriptions.status === 'loading' ? renderLoading() : prescriptions.error ? renderError(prescriptions.error) : getDataLength(prescriptions.prescriptions)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Sales" bordered={false}>
            {sales.status === 'loading' ? renderLoading() : sales.error ? renderError(sales.error) : getDataLength(sales.sales)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Inventory" bordered={false}>
            {inventory.status === 'loading' ? renderLoading() : inventory.error ? renderError(inventory.error) : getDataLength(inventory.items)}
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt-5">
        <Col span={24} className="w-full flex flex-col md:flex-row">
          <Card title="Sales Trends" bordered={false} className="w-full md:w-1/2 md:mr-2 mb-5 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              {sales.status === 'loading' ? (
                renderLoading()
              ) : sales.error ? (
                renderError(sales.error)
              ) : (
                <AreaChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Card>
          <Card title="Inventory Levels" bordered={false} className="w-full md:w-1/2 md:ml-2">
            <ResponsiveContainer width="100%" height={300}>
              {inventory.status === 'loading' ? (
                renderLoading()
              ) : inventory.error ? (
                renderError(inventory.error)
              ) : (
                <BarChart data={inventoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <div className="mt-5 flex justify-end">
        <Button type="primary" onClick={downloadReport}>
          Download Report
        </Button>
      </div>
      <div id="report-content" ref={reportRef} style={{ position: 'absolute', left: '-9999px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Total Customers" bordered={false}>
              {getDataLength(customers.customers)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Prescriptions" bordered={false}>
              {getDataLength(prescriptions.prescriptions)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Sales" bordered={false}>
              {getDataLength(sales.sales)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Inventory" bordered={false}>
              {getDataLength(inventory.items)}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mt-5">
          <Col span={12}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
          <Col span={12}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;

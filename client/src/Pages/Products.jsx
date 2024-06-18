import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventories } from "../Redux/inventorySlice";
import { Layout, Row, Col, Card, Typography, Spin, Pagination, Input } from "antd";
import Footer from "../Components/Footer";
import { StickyNavbar } from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchInventories());
    }
  }, [dispatch, navigate, user]);

  const handleSearch = (value) => {
    setSearchLoading(true);
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on new search
    // Simulate a delay to show the loading spinner
    setTimeout(() => {
      setSearchLoading(false);
    }, 500); // Adjust the timeout as needed
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <Spin className="flex justify-center items-center h-screen" />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-bold mt-20">
        Internal Server Error
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      <StickyNavbar />
      <Content className="container mx-auto py-10 px-4 lg:px-8">
        <div className="relative mb-8 flex justify-between items-center">
          <Title level={2} className="text-center mb-8 w-full">
            Stock
          </Title>
          <div className="fixed top-16 right-4 lg:right-8 z-10 w-3/4 lg:w-1/4 shadow-lg flex items-center">
            <Search
              placeholder="Search Product"
              enterButton="Search"
              size="large"
              onSearch={handleSearch}
              loading={searchLoading}
            />
          </div>
        </div>
        {searchLoading ? (
          <Spin className="flex justify-center items-center h-96" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {paginatedItems.map((item) => (
                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={item.name}
                        src="/med.jpg"
                        className="h-56 object-cover"
                      />
                    }
                  >
                    <Card.Meta
                      title={item.name}
                      description={
                        <>
                          <Text>Price: Gh₵ {item.amount}.00</Text>
                          <br/>
                          <Text>Qty: {item.quantity} pcs</Text>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredItems.length}
                onChange={handleChangePage}
                showSizeChanger
              />
            </div>
          </>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default ProductsPage;

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomePage() {
  const {data: products, isLoading, error}  = useGetProductsQuery();
  return (
    <>
    {isLoading ? (<Loader />) : error ?  (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : (
      <>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
      </>
    )}
     
    </>
  );
}

export default HomePage;

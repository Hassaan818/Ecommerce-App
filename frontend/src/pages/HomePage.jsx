import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const products = await axios.get("/api/products");
    console.log(products);
    return {products};
  } catch (error) {
    console.log(error);
    return error;
  }
};

function HomePage() {
  const {products}  = useLoaderData();
  return (
    <>
      <h2>Latest Products</h2>
      <Row>
        {products.data.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;

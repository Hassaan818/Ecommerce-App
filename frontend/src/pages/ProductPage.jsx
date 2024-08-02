import { useLoaderData } from "react-router-dom";
// import products from "../products.json";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

export const loader = async({params}) => {
    try {
        const product = await axios.get(`/api/products/${params.id}`);
        return {product}
    } catch (error) {
        console.log(error);
        return error;
    }
}

function ProductPage() {
//   const { i } = useParams();
  const {product} = useLoaderData();
//   const product = products.find((prod) => prod._id == productId);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
        <Image src={product.data.image} alt={product.data.name} fluid />
        </Col>
        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    {product.data.name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.data.rating} text={`${product.data.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                   Price: ${product.data.price}
                </ListGroup.Item>
                <ListGroup.Item>
                   Description: {product.data.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                            <strong>${product.data.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.data.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className="btn-block" type='button' disabled={product.data.countInStock === 0}>
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;

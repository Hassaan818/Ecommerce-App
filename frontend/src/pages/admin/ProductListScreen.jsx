import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDeleteProductMutation, useGetProductsQuery } from "../../slices/productsApiSlice";
import {toast} from 'react-toastify'
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";

function ProductListScreen() {
  const {pageNumber} = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});
  const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

  const productDeleteHandler = async (id) => {
    if(window.confirm("are you sure ?")){
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.msg || error.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
        <Meta title="Products List" />
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => productDeleteHandler(product._id)}
                      disabled={loadingDelete}
                    >
                      <FaTrash style={{color: 'white'}} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
}

export default ProductListScreen;

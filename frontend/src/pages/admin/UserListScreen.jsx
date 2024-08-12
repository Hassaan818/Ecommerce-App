import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

function UserListScreen() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    if(window.confirm("are you sure ?")){
        try {
          await deleteUser(id);
          toast.success('User deleted');
          refetch();
        } catch (error) {
          toast.error(error?.data?.msg || error.error);
        }
      }
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
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
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.isAdmin ? "Admin" : "User" }</td>

                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteUserHandler(user._id)}
                      disabled={loadingDelete}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default UserListScreen;

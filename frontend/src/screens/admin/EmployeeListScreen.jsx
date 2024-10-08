import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

const EmployeeListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm(`Are you sure you want to delete`)) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.msg || err.error);
      }
    }
  };

  return (
    <>
      <h1>Employees</h1>
      <div className="d-flex justify-content-start mb-3">
        <LinkContainer to="/admin/create_employee">
          <Button variant="primary">
            Add Employee
          </Button>
        </LinkContainer>
      </div>
      {(isLoading || deleteLoading) && <Loader />}
      {error ? (
        <Message variant="danger">{error?.data?.msg || error?.message || "An error occurred"}</Message>
      ) : (!users || users.length === 0 ? (
        <Message variant="info">No employees found</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col">Hire Date</th>
              <th scope="col">Admin</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.phone}</td>
                <td>{user.position}</td>
                <td>{user.department}</td>
                <td>{new Date(user.hireDate).toLocaleDateString()}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/employee/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ))}
    </>
  );
};

export default EmployeeListScreen;

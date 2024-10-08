import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
const EmployeeEditScreen = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery(id);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        position: user.position,
        department: user.department,
        isAdmin: user.isAdmin,
      });
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId: id, ...formData });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/employeeList');
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.msg || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/employeeList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Employee</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.msg || error.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="phone" className="my-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="position" className="my-2">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="department" className="my-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={formData.isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-2"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EmployeeEditScreen;

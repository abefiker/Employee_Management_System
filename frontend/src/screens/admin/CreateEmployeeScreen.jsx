import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';

const CreateEmployeeScreen = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '', // Add hire date field
    isAdmin: false,
    password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formattedHireDate = new Date(formData.hireDate).toISOString();
    try {
      await createUser({ ...formData, hireDate: formattedHireDate }).unwrap();
      toast.success('User created successfully');
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
        <h1>Create Employee</h1>
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

            {/* Hire Date */}
            <Form.Group controlId="hireDate" className="my-2">
              <Form.Label>Hire Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.hireDate}
                onChange={(e) =>
                  setFormData({ ...formData, hireDate: e.target.value })
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

            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CreateEmployeeScreen;

import { UserAuth } from '../../context/AuthContext';
import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = ({onHandleShow}) => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const {createUser} = UserAuth();
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      await createUser(formFields.email, formFields.password);
      navigate('/dashboard');
    } catch (e) {
      onHandleShow(`Sign up error: ${e.message}`)
    }

    // call back to api

    setFormFields({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  const onFirstNameChange = (event) => {
    setFormFields({
      ...formFields,
      firstName: event.target.value,
    });
  };

  const onLastNameChange = (event) => {
    setFormFields({
      ...formFields,
      lastName: event.target.value,
    });
  };

  const onEmailChange = (event) => {
    setFormFields({
      ...formFields,
      email: event.target.value,
    });
  };

  const onPasswordNameChange = (event) => {
    setFormFields({
      ...formFields,
      password: event.target.value,
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmitForm}>
        <p>Already have an account? <Link to='/' className='underline'>Sign in.</Link></p>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First Name"
            value={formFields.firstName}
            onChange={onFirstNameChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last Name"
            value={formFields.lastName}
            onChange={onLastNameChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={formFields.email}
            onChange={onEmailChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={formFields.password}
            onChange={onPasswordNameChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignUpForm
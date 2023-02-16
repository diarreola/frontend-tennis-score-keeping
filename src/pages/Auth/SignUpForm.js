import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

const SignUpForm = () => {
  // add first name and last name
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onSubmitForm = (event) => {
    event.preventDefault();

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
            value={formFields.firstName}
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
            value={formFields.firstName}
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
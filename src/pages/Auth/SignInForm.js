import { UserAuth } from '../../context/AuthContext';
import { React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = ({onHandleShow}) => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setFormFields({
      ...formFields,
      email: event.target.value,
    });
  };

  const onPasswordChange = (event) => {
    setFormFields({
      ...formFields,
      password: event.target.value,
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      await signIn(formFields.email, formFields.password);
      navigate('/dashboard');
    } catch (e) {
      console.log(e.message);

      onHandleShow('Email or password incorrect, Try again')
    }
    // call back to api

    setFormFields({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmitForm}>
        <p>Don't have an account? <Link to='/signup' className='underline'>Sign up.</Link></p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
              required type="email"
              placeholder="Enter email"
              value={formFields.email}
              onChange={onEmailChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          required type="password"
          placeholder="Password" 
          value={formFields.password}
          onChange={onPasswordChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignInForm
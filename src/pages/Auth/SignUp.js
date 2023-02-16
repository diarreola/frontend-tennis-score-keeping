import {React, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
          </Col>
          <Col xs={6} md={4}>
            <Card>
              <Card.Header>Sign Up</Card.Header>
              <Card.Body>
                <SignUpForm />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUp;

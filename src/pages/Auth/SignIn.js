import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SignInForm from './SignInForm';


const SignIn = ({onHandleShow}) => {
  return (
    <Container>
        <Row>
          <Col xs={6} md={4}>
          </Col>
          <Col xs={6} md={4}>
            <Card>
              <Card.Header>Sign In</Card.Header>
              <Card.Body>
                <SignInForm
                onHandleShow={onHandleShow}/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
          </Col>
        </Row>
    </Container>
  )
}

export default SignIn;
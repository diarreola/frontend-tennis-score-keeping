import React from 'react';
import UserNavbar from '../../components/UserNavbar';
import MatchButtons from './MatchButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchControlFooter from './MatchControlFooter';

const CurrentMatch = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
        <Row>
          <Col><MatchButtons /></Col>
          <Col><MatchButtons /></Col>
        </Row>
      </Container>
      <MatchControlFooter></MatchControlFooter>
    </div>
  )
};

export default CurrentMatch;
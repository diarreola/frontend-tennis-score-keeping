import React from 'react';
import UserNavbar from '../../components/UserNavbar';
import MatchButtons from './MatchButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MatchControlFooter from './MatchControlFooter';
import MatchCourt from './MatchCourt';
import MatchScoreTable from './MatchScoreTable';

const CurrentMatch = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <MatchScoreTable></MatchScoreTable>
      <Container>
        <Row>
          <Col><MatchCourt /></Col>
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
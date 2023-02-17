import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './MatchCourt.css'

const MatchCourt = () => {
  return (
    <Card className='court-grid'>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default MatchCourt
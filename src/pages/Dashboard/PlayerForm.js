import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const today = new Date();
function PlayerForm(props) {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    utr: '',
    serveStyle: ''
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    setFormFields({
      firstName: '',
      lastName: '',
      dob: '',
      utr: '',
      serveStyle: ''
    });
  };

  const onFirstNameChange = (event) => {
    setFormFields({
        ...formFields,
        firstName: event.target.value
    })
  };

  const onLastNameChange = (event) => {
    setFormFields({
        ...formFields,
        lastName: event.target.value
    })
  };

  const onDOBChange = (event) => {
    // const dOB = event.toUTCString() TOD): send to API
    setFormFields({
        ...formFields,
        dob: event
    })
  };

  const onUTRChange = (event) => {
    const validUTR = (event.target.validity.valid) ? event.target.value : '';
    setFormFields({
        ...formFields,
        utr: validUTR
    })
  };

  const onServeStyleChange = (event) => {
    if (event.target.value === 'none') {
      //  TODO: Throw an modal error -> Please select serve style
      return
    }
    setFormFields({
      ...formFields,
      serveStyle: event.target.value
  })
  }


  return (
    <section>
      <Card>
        <Card.Header>Add a New Player </Card.Header>
        <Card.Body>
          <Form
            aria-label="Create a New Board"
            name="boardForm"
            className="player-form"
            onSubmit={onFormSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                  required
                  name="first-name"
                  type="first-name"
                  className="player-first-name"
                  value={formFields.firstName}
                  onChange={onFirstNameChange} />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                  required
                  name="last-name"
                  type="last-name" 
                  className="player-last-name"
                  value={formFields.lastName}
                  onChange={onLastNameChange}/>
            </Form.Group>
            <DatePicker
              selected={formFields.dob}
              onChange={onDOBChange}
              className="form-control"
              minDate={today}
              customInput={
                <input
                  type="text"
                  id="validationCustom01"
                  placeholder="First name"
                />
              }
            />
            <Form.Select value={formFields.serveStyle} onChange={onServeStyleChange}aria-label="Default select example">
                <option className="option" value="none">Choose A Serve Style</option>
                <option className="option" value="right">Right</option>
                <option className="option" value="left">Left</option>
                <option className="option" value="both">Both</option>
            </Form.Select>
            <Form.Group controlId="formUTR">
              <Form.Label>UTR</Form.Label>
              <Form.Control
                  required
                  name="utr"
                  type="number"
                  pattern="[0-9]*"
                  min="1"
                  max="16"
                  className="player-utr"
                  value={formFields.utr}
                  onChange={onUTRChange}/>
            </Form.Group>
            <Button className="submit-button"  type="submit">
              Submit Query
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
    
  );
}

export default PlayerForm;
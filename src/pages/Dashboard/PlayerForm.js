import { React, useState } from 'react';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
// import { Formik } from 'formik';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard } from '@fortawesome/free-regular-svg-icons';

const today = new Date();
function PlayerForm(props) {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    utr: '',
    serveStyle: ''
  });
  // lift up

  const onFormSubmit = (event) => {
    event.preventDefault();

    // props.addBoardCallBack({
    //   title: formFields.title,
    //   owner: formFields.owner
    // });

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
    setFormFields({
        ...formFields,
        utr: event.target.value
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
                  type="utr" 
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

// NewBoardForm.propTypes = {
//   addBoardCallBack: PropTypes.func.isRequired
// };

export default PlayerForm;
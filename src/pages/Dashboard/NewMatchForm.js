import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Select from 'react-dropdown-select';

function NewMatchForm({players}) {
  const [formFields, setFormFields] = useState({
    playerA: 0,
    playerB: 0,
    numSets: '',
    numGames: '',
  });

  const [disableButton, setDisableButton] = useState(true);

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('for', formFields)

    setFormFields({
      playerA: 0,
      playerB: 0,
      numSets: null,
      numGames: null,
    });
  };

  const onNumSetsChange = (event) => {
    const validNumSets = event.target.validity.valid ? event.target.value : '';
    setFormFields({
      ...formFields,
      numSets: validNumSets,
    });
  };

  const onNumGamesChange = (event) => {
    const validNumGames = event.target.validity.valid ? event.target.value : '';
    setFormFields({
      ...formFields,
      numGames: validNumGames,
    });
  };

  const onPlayerChange = (value) => {
    if (value.length === 0) {
      setFormFields({
        ...formFields,
        playerA: '',
        playerB: '',
      });
      setDisableButton(true);
      return
    }
    if (value.length < 2) {
      setDisableButton(true);
      return
    }
    if (value.length > 2) {
      value.pop()
      return
    }
    if (value.length === 2) {
      setFormFields({
        ...formFields,
        playerA: value[0].id,
        playerB: value[1].id,
      });
      setDisableButton(false);
      return
    }
  };

  return (
    <section>
      <Card>
        <Card.Header>Start a New Match</Card.Header>
        <Card.Body>
          <Form
            aria-label="Start a New Match"
            name="newMatchForm"
            className="new-match-form"
            onSubmit={onFormSubmit}
          >
            <Form.Group controlId="formNumSets">
              <Form.Label>Number of Sets</Form.Label>
              <Form.Control
                required
                name="numSets"
                type="number"
                pattern="[0-5]*"
                min="1"
                max="5"
                className="match-num-sets"
                value={formFields.numSets}
                onChange={onNumSetsChange}
              />
            </Form.Group>
            <Form.Group controlId="formNumGames">
              <Form.Label>Number of Games</Form.Label>
              <Form.Control
                required
                name="numGames"
                type="number"
                pattern="[0-6]*"
                min="1"
                max="6"
                className="match-num-games"
                value={formFields.numGames}
                onChange={onNumGamesChange}
              />
            </Form.Group>
            <div>
              Choose Player A & Player B
            <Select
              options={players}
              values={[]}
              labelField="first_name"
              valueField="id"
              required
              multi
              name="select"
              onChange={(value) => onPlayerChange(value)}
            />
            </div>
            <Button disabled={disableButton} className="submit-button" type="submit">
              Start a Match
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

export default NewMatchForm;

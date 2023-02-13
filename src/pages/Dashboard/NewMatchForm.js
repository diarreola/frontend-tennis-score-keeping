import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function NewMatchForm() {
  const [formFields, setFormFields] = useState({
    playerA: '',
    playerB: '',
    numSets: '',
    numGames: '',
  });

  const onFormSubmit = (event) => {
    event.preventDefault();

    setFormFields({
      playerA: '',
      playerB: '',
      numSets: '',
      numGames: '',
    });
  };

  const onPlayerAChange = (event) => {
    if (event.target.value === 'none') {
      //  TODO: Throw an modal error -> Please select serve style
      return;
    }
    setFormFields({
      ...formFields,
      playerA: event.target.value,
    });
  };

  const onPlayerBChange = (event) => {
    if (event.target.value === 'none') {
      //  TODO: Throw an modal error -> Please select serve style
      return;
    }
    setFormFields({
      ...formFields,
      playerB: event.target.value,
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
            <Form.Group controlId="playerA">
              <Form.Select
                name="playerA"
                value={formFields.playerA}
                onChange={onPlayerAChange}
                aria-label="Default select example"
              >
                <option className="option" value="none">
                  Choose Player A
                </option>
                <option className="option" value="right">
                  Right
                </option>
                <option className="option" value="left">
                  Left
                </option>
                <option className="option" value="both">
                  Both
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="playerB">
              <Form.Select
                name="playerB"
                value={formFields.playerB}
                onChange={onPlayerBChange}
                aria-label="Default select example"
              >
                <option className="option" value="none">
                  Choose Player B
                </option>
                <option className="option" value="right">
                  Right
                </option>
                <option className="option" value="left">
                  Left
                </option>
                <option className="option" value="both">
                  Both
                </option>
              </Form.Select>
            </Form.Group>

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
            <Button className="submit-button" type="submit">
              Start
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

export default NewMatchForm;

import React from 'react';
import NewMatchForm from '../NewMatchForm';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('NewMatchForm Tests', () => {
  beforeEach(() => {
    render(<NewMatchForm />);
  });

  test('Loads an empty form', () => {
    expect(
      screen.getByRole('form', {
        name: /Start a New Match/i,
      })
    ).toHaveFormValues({
      playerA: 'none',
      playerB: 'none',
      numSets: '',
      numGames: 'none'
    });
  });

});
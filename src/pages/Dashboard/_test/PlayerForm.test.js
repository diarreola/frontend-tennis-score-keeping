import React from 'react';
import PlayerForm from '../PlayerForm';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('PlayerForm Tests', () => {
  beforeEach(() => {
    render(<PlayerForm />);
  });

  test('Loads an empty form', () => {
    expect(
      screen.getByRole('form', {
        name: /Add a New Player/i,
      })
    ).toHaveFormValues({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      serveStyle: 'none',
      utr: 0,
    });
  });

});

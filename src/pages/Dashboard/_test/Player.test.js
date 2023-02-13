import React from 'react';
import Player from '../Player';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('Player Component Tests', () => {
  beforeEach(() => {
    render(
      <div>
        <Player firstName="Poppie" lastName="John" />
      </div>
    );
  });

  test('displays first and last name', () => {
    expect(screen.getByText(/Poppie John/)).toBeInTheDocument();
  });

});
import React from 'react';
import PastMatchesTable from '../PastMatchesTable';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import matches from '../../../data/past_matches.json'

describe('PastMatchesTable Component Tests', () => {
  const playerId = 1;
  beforeEach(() => {
    render(
      <div>
        <PastMatchesTable matches={matches}/>
      </div>
    );
  });

  test('displays match name, date, players ', () => {
    expect(screen.getByText(/Sat, 25 Feb 2023 08:00:00 GMT/)).toBeInTheDocument();
    expect(screen.getByText(/Fun Game/)).toBeInTheDocument();
    expect(screen.getByText(/Dennis Racket/)).toBeInTheDocument();
    expect(screen.getByText(/Greta Smith/)).toBeInTheDocument();
  });

});
import React from 'react';
import PastMatchesRow from '../PastMatchesRow';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import matches from '../../../data/past_matches.json'

describe('PastMatchesRow Component Tests', () => {
  const matchId = 1;
  const matchPlayerA = 1;
  const matchPlayerB = 2;
  beforeEach(() => {
    render(
      <div>
        <PastMatchesRow
        id={matchId}
        matchDate='Sat, 25 Feb 2023 08:00:00 GMT'
        matchName='Fun Game'
        matchPlayerA={matchPlayerA}
        matchPlayerB={matchPlayerB}/>
      </div>
    );
  });

  test('displays match name, date, players', () => {
    expect(screen.getByText(/Fun Game/)).toBeInTheDocument();
    expect(screen.getByText(/Sat, 25 Feb 2023 08:00:00 GMT/)).toBeInTheDocument();
    expect(screen.getByText(/Dennis Racket/)).toBeInTheDocument();
    expect(screen.getByText(/Greta Smith/)).toBeInTheDocument();
  });
});
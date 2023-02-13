import React from 'react';
import PastMatchesRow from '../PastMatchesRow';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('PastMatchesRow Component Tests', () => {
  const matchId = 1;
  const matchPlayerA = 'Dennis Racket';
  const matchPlayerB = 'Greta Smith';
  beforeEach(() => {
    render(
      <tr key={matchId}>
        <PastMatchesRow
        id={matchId}
        matchDate='Sat, 25 Feb 2023 08:00:00 GMT'
        matchName='Fun Game'
        matchPlayerA={matchPlayerA}
        matchPlayerB={matchPlayerB}/>
      </tr>
    );
  });

  test('displays match name, date, players', () => {
    expect(screen.getByText(/Fun Game/)).toBeInTheDocument();
    expect(screen.getByText(/Sat, 25 Feb 2023 08:00:00 GMT/)).toBeInTheDocument();
    expect(screen.getByText(/Dennis Racket/)).toBeInTheDocument();
    expect(screen.getByText(/Greta Smith/)).toBeInTheDocument();
  });
});
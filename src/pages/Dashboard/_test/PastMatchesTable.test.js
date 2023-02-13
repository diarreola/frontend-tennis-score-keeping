import React from 'react';
import PastMatchesTable from '../PastMatchesTable';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import matches from '../../../data/past_matches.json'

describe('PastMatchesTable Component Tests', () => {
  const getPlayerNameFromId = (id) => {
  };
  beforeEach(() => {
    render(
      <div>
        <PastMatchesTable getPlayerNameFromId={getPlayerNameFromId} matches={matches}/>
      </div>
    );
  });

  test('displays match name, date, players', () => {
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Date/)).toBeInTheDocument();
    expect(screen.getByText(/Player A/)).toBeInTheDocument();
    expect(screen.getByText(/Player B/)).toBeInTheDocument();
  });
});
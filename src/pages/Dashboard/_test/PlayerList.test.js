import React from 'react';
import PlayerList from '../PlayerList';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react'
import players from '../../src/data/player_data.json'


describe('PlayList component Test', () => {
  beforeEach(() => {
    render(<PlayerList players={players} />);
  });

  test('renders without crashing and shows all players created by the user', () => {
    expect(screen.getByText(/Dennis Racket/)).toBeInTheDocument();
    expect(screen.getByText(/Greta Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Toad Bob/)).toBeInTheDocument();
    expect(screen.getByText(/Tabby Cat/)).toBeInTheDocument();
    expect(screen.getByText(/Ryan Pratt/)).toBeInTheDocument();
  });

  test('renders an empty list without crashing', () => {
    const element = render(<PlayerList players={[]} />);
    expect(element).not.toBeNull();
  });
});
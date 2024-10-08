import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('should render text from the homepage', () => {
  render(<App />);
  const linkElement = screen.getByText(/Find and apply for the best jobs with Jobly./i);
  expect(linkElement).toBeInTheDocument();
});

it('should render without crashing', () => {
  render(<App />);
});
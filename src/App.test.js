import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login Form/i);
  expect(linkElement).toBeInTheDocument();
});

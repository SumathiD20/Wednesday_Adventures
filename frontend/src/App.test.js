import { render, screen } from '@testing-library/react';
import App from './App';
/**
 * Test that verifies if the "learn react" link is rendered correctly in the App component.
 * 
 * This test checks if an element with the text "learn react" is present in the document after
 * the App component is rendered. This helps ensure that the component renders the correct content.
 */

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

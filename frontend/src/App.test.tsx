import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import store from './store/store'

test('renders landing page', () => {
  const testStore = store
  const app = (
    <StoreProvider store={testStore}>
      <App />
    </StoreProvider>
  );
  render(app)
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});

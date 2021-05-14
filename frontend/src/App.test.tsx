import { render, screen } from '@testing-library/react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import App from './App'
import store from './store/store'

test('renders landing page', () => {
  const testStore = store
  const app = (
    <StoreProvider store={testStore}>
      <App />
    </StoreProvider>
  )
  render(app)
  const linkElement = screen.getByText(/No menu items currently available/i)
  expect(linkElement).toBeInTheDocument()
})

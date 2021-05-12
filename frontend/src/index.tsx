import { Auth0Provider } from '@auth0/auth0-react'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import store from './store/store'

ReactDOM.render(
  <Auth0Provider
    domain="dev-p49lhvph.us.auth0.com"
    clientId="MsfplCFtHA4fi8lJbx3tY1XLkIdoJqkC"
    redirectUri={window.location.origin}
  >
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

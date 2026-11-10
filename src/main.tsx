import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { persistAuth } from './model/LoginSubcribe.ts'
import { AuthSocketHandler } from './wss/AuthSocketHandler.ts'
import { chatSocket } from './wss/ChatWebSocket.ts'


// persistAuth(store);
// AuthSocketHandler(store.dispatch);
// chatSocket.connect().catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)

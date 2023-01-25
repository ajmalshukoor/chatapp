import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { MessageContextProvider } from './context/MessageContext';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
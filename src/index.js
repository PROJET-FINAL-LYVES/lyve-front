import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './utils/serviceworker/serviceWorkerRegistration';
import reportWebVitals from './utils/serviceworker/reportWebVitals';
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  //  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.s Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import history from "./app/utils/history";
import App from './app/App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const root = createRoot(document.getElementById('root'));
const store = createStore();
root.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </Router>        
  </Provider>
);

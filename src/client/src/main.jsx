import React from "react";
import { BrowserRouter } from 'react-router-dom';
// Note: Using an Alias in Webpack
import App from './components/App';

import 'bootstrap'; // Import Bootstrap’s JavaScript
import 'popper.js'; // Import Bootstrap’s dependencies
import 'jquery'; // Import Bootstrap’s dependencies
import './assets/scss/main.scss';

import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
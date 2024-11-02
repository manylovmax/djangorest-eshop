import React from "react";

// Note: Using an Alias in Webpack
import App from 'components/App';

import 'bootstrap'; // Import Bootstrap’s JavaScript
import 'popper.js'; // Import Bootstrap’s dependencies
import 'jquery'; // Import Bootstrap’s dependencies
import './static/scss/main.scss';

import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);


// Note: Before npm run build the statement module.hot.accept(); could / should to be disabled / comment out !!!
// In Webpck HotModuleReplacementPlugin() is used to set hot to true. 
// This way the browser dont need to reload the entire page when changing  file !
// Note: Needed here - in contrast to Vue.js  !!
 if (module.hot) {
    module.hot.accept();
 }
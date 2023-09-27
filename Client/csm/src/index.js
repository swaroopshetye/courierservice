import React from 'react';
import ReactDOM from 'react-dom/client';
import Controller from './screens/Components/Controller';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Controller/>);


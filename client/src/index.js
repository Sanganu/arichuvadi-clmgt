 import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from "./reduxReducers/loginReducer";

const store = createStore(loginReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

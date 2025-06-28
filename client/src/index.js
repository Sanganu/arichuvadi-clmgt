 import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import loginReducer from "./reduxReducers/loginReducer";


// const store = configureStore({
//   reducer: loginReducer,
// });

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
      <App />
        
  </React.StrictMode>
);  
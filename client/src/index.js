
// import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import './API/axios';
import loginReducer from './reduxReducers/loginReducer';
// import store from "./store";

// --- 1. preload state from localStorage (sync, runs before App mounts)
const STORAGE_KEY = 'arichuvadi_auth';
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch { return undefined; }
};

const store = createStore(loginReducer, loadState());

// --- 2. persist on every change (keep only safe fields)
store.subscribe(() => {
  const s = store.getState();
  if (s.invalid) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    const { loginemail, userid, usertype, userfname, userlname, invalid } = s;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ loginemail, userid, usertype, userfname, userlname, invalid })
    );
  }
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
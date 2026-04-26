import { createStore } from 'redux';
import loginReducer from './reduxReducers/loginReducer';

const STORAGE_KEY = 'arichuvadi_auth';
const loadState = () => {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : undefined; }
  catch { return undefined; }
};

const store = createStore(loginReducer, loadState());

store.subscribe(() => {
  const s = store.getState();
  if (s.invalid) localStorage.removeItem(STORAGE_KEY);
  else {
    const { loginemail, userid, usertype, userfname, userlname, invalid } = s;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ loginemail, userid, usertype, userfname, userlname, invalid }));
  }
});

export default store;
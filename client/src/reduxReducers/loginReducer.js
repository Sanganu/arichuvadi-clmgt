import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginemail: '',
  userid: '',
  usertype: '',
  userfname: '',
  userlname: '',
  invalid: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { loginemail, userfname, userlname, usertype, invalid, userid } = action.payload;
      state.loginemail = loginemail;
      state.userfname = userfname;
      state.userlname = userlname;
      state.usertype = usertype;
      state.invalid = invalid;
      state.userid = userid;
    },
  },
});

export const { setCredentials } = loginSlice.actions;
export default loginSlice.reducer;

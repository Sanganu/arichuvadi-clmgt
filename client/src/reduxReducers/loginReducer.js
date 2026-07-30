const initState = {
  loginemail: "",
  userid: "",
  usertype: "",
  userfname: "",
  userlname: "",
  invalid: true,
  bootstrapped: false,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CREDENTIALS':
      return { ...state, ...action.userCred, invalid: false, bootstrapped: true };

    case 'AUTH_BOOTSTRAPPED':         // hydration finished, no user found
      return { ...state, bootstrapped: true };

    case 'LOGOUT':                    // wipe everything cleanly
      return { ...initState, bootstrapped: true };

    default:
      return state;
  }
};

export default loginReducer;

export const loginCredentials = (userCred) => ({ type: 'SET_CREDENTIALS', userCred });
export const authBootstrapped  = ()         => ({ type: 'AUTH_BOOTSTRAPPED' });
export const logoutAction      = ()         => ({ type: 'LOGOUT' });
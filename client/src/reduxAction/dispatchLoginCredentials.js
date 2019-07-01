export const  loginCredentials = (userCred) => {
    return {
        type: 'SET_CREDENTIALS',
        userCred: userCred
    }
}
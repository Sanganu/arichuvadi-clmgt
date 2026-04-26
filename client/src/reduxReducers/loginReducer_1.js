const initState = {
    loginemail: "",
    userid: "",
    usertype : "",
    userfname:"",
    userlname:"",
    invalid:true
}
const loginReducer = (state = initState,action) => {
   // console.log("Redux the parameter received",action);
    switch(action.type){
     case 'SET_CREDENTIALS':{
        console.log("Redux store values -- ",action.userCred);
          return{
             loginemail: action.userCred.loginemail,
             userfname: action.userCred.userfname,
             userlname: action.userCred.userlname,
             usertype: action.userCred.usertype,
             invalid: action.userCred.invalid,
             userid: action.userCred.userid
         }
      }
     default:
       return state;
    }
}    

export default loginReducer;


// import React from "react";

export const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    else
    return (false);
}

export const ValidateName = (inputtxt) => {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        alert("message");
        return false;
    }
}

export const CheckPassword = (inputtxt) => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.match(passw)) {
       
        return true;
    }
    else {
       
        return false;
    }
}

export const ValidateNumbers = (inputtxt) => {
    var numbers = /^[0-9]+$/;
    if (inputtxt.match(numbers)) {
         return true;
    }
    else {
        return false;
    }
}

export const ValidatePhonenumber = (inputtxt) =>
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.match(phoneno))
  {
      return true;
    }
      else
        {
     
        return false;
        }
}
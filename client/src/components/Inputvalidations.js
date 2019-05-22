import React from "react";

export const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

export const allLetter = (inputtxt) => {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        alert("message");
        return false;
    }
}

export const CheckPassword = (inputtxt) => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.value.match(passw)) {
        alert('Correct, try another...')
        return true;
    }
    else {
        alert('Wrong...!')
        return false;
    }
}

export const allnumeric = (inputtxt) => {
    var numbers = /^[0-9]+$/;
    if (inputtxt.value.match(numbers)) {
        alert('Your Registration number has accepted....');
        document.form1.text1.focus();
        return true;
    }
    else {
        alert('Please input numeric characters only');
        document.form1.text1.focus();
        return false;
    }
}

export const phonenumber = (inputtxt) =>
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if((inputtxt.value.match(phoneno))
        {
      return true;
        }
      else
        {
        alert("message");
        return false;
        }
}
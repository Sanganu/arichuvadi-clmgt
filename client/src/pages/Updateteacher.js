import React, { Component } from 'react';

class Updateteacher extends Component{
    state = {
        firstname: "",
        lastname: "",
        title: "Teacher",
        email: "",
        errmsg: "",
        phone: "",
        password:""
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            //console.log('The Value in input change', value, name);
        });

    }

    render() {
        return(<div>
            <h1>My Account</h1>
            <p>fname</p>
            <p>Lname</p>
            <p>email</p>
            <p>password</p>
            <p>zoom</p>
            <p>Skype</p>    
            <button>Changepassowrd</button>

       </div> )
    }
}

export default Updateteacher;
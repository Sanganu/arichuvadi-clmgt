import  React, {Component } from 'react';
import GoogleLogin from 'react-google-login';
import keys from '../keys/keys.js'

class InstructorLogin extends Component {
     responseGoogle = (response) => {
        console.log(response);
      }
    render() {
        return (
            <GoogleLogin
                clientId= {keys.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />

         );
    }
}

export default InstructorLogin;

import React, { Component } from 'react';
import Allbatches from './displayallbatchdetails';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import { Menubar } from '../components/Menubar';
import Batchmain from './Batchmain';
// import GoogleLogin from 'react-google-login';
import keys from '../keys/keys.js'

class Teachermain extends Component {
    state = {
        invalid: '',
        vemail: '',
        vpword: '',
        logindisp: true
    };

    responseGoogleValid = (response) => {
        console.log("Google OAuth Credentials Valid", response);
        this.setState({
            invalid: false,
            logindisp: false
        });
    }

    responseGoogleInvalid = (response) => {
        console.log("Google Oauth Credentials Invalid", response);
        this.setState({ invalid: true });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //console.log('The Value in input change',value,name);

        this.setState({
            [name]: value
        });
    };


    logincheck = (event) => {
        event.preventDefault();
        console.log("Use myemail@yahoo.com and welcome to enter site ");
        console.log(this.state.vemail, this.state.vpword);

        if (this.state.vemail === "myemail@yahoo.com" &&
            this.state.vpword === "welcome") {
            console.log('if valid');
            // window.location = '/teacher/batchmain/';
            this.setState({
                invalid: false,
                logindisp: false
            });
        }
        else {

            this.setState({ invalid: true });
        }
    }


    render() {
        return (<div>
            <Teacherheader />
            <div className="container middlecontent">
                {this.state.logindisp ?
                    <div className="row" >
                        <div className="col-lg-1">
                            <Menubar />
                        </div>
                        <div className="col-lg-6">
                            <form className="inputsection">
                                <h3> Instructor Login</h3>
                                <p>Temporary Login page</p>
                                <div className="form-group">

                                    <input className="form-control"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="vemail"
                                        id="vemail"
                                        value={this.state.vemail}
                                        required />
                                    <label className="form-control-placeholder"
                                        htmlFor="vemail">Email Address </label>
                                </div>
                                <div className="form-group">

                                    <input className="form-control"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        name="vpword"
                                        id="vpword"
                                        value={this.state.vpword}
                                        required />
                                    <label
                                        className="form-control-placeholder"
                                        htmlFor="vpword">Password </label>
                                </div>

                                <p>Hint: (email:myemail@yahoo.com  password:welcome)</p>
                                <button className="createbutton" id="blogin" onClick={this.logincheck}>Login</button>
                            </form>
                        </div>
                    </div>
                    : <Allbatches />
                }
                {this.state.invalid ?
                    <div>
                        <h6 className="errmsg">Invalid Credentials - Please use right credentials</h6>
                    </div> : <div></div>}

            </div>

        </div>
        ); //end return
    } //end render
} //end class Teacher Main

export default Teachermain;



{/* <div className="col-lg-5 col-md-12">
                            <div className="card sm-5 dark-card-title ">
                                <div className="card-body">
                                    <GoogleLogin
                                        clientId={keys.GOOGLE_CLIENT_ID}
                                        buttonText="Login"
                                        onSuccess={this.responseGoogleValid}
                                        onFailure={this.responseGoogleInvalid}
                                    />
                                </div>
                            </div>
                        </div> */}
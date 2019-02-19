import React, { Component } from 'react';
import Allbatches from './displayallbatchdetails';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Batchmain from './Batchmain';
import GoogleLogin from 'react-google-login';
import keys from '../keys/keys.js'

class Teachermain extends Component {
    state = {
        invalid: '',
        vemail: '',
        vpword: '',
        logindisp: true
    };

    responseGoogleValid = (response) => {
        console.log("Google OAuth Credentials Valid",response);
        this.setState({
            invalid: false,
            logindisp: false
        });
    }

    responseGoogleInvalid = (response) => {
        console.log("Google Oauth Credentials Invalid",response);
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
        return (<div >
            {this.state.logindisp ?
                <div>
                    <Header />
                    <div className="tloginsection container">
                        <div className="row">
                            <h3 id="tlogin">Teacher Login</h3>
                            {/*<div className = "col-sm-6">*/}
                            <form className="inputsection">
                                <div className="form-group">

                                    <input className="form-control"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="vemail"
                                        id="vemail"
                                        value={this.state.vemail}
                                        required />
                                    <label className="form-control-placeholder"
                                        for="vemail">Email Address </label>
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
                                        for="vpword">Password </label>
                                </div>
                                <br />
                                <p>Hint: (email:myemail@yahoo.com  password:welcome)</p>
                                <button className="createbutton" id="blogin" onClick={this.logincheck}>Login</button>
                            </form>

                            <div className="card mb-4 dark-card-title ">
                               <div className="card-body">
                                <GoogleLogin
                                    clientId={keys.GOOGLE_CLIENT_ID}
                                    buttonText="Login"
                                    onSuccess={this.responseGoogleValid}
                                    onFailure={this.responseGoogleInvalid}
                                />
                                </div>
                            </div>
                            <div className="card-mb-4 dark-card-title ">
                            </div>
                        </div>
                    </div>
                </div>
                : <div>
                    <Allbatches />

                </div>}

            {this.state.invalid ?
                <div>
                    <h6 className="errmsg">Invalid Credentials - Please use right credentials</h6>
                </div> : <div></div>}

            <Footer />
        </div>
        ); //end return
    } //end render

} //end class Teacher Main

export default Teachermain;

import React, { Component } from 'react';
import Allbatches from './displayallbatchdetails';
import Teacherheader from '../components/Teacherheader';
import axios from "axios";
import { Menubar } from '../components/Menubar';
//import Header from '../components/Header';
// import GoogleLogin from 'react-google-login';
//import keys from '../keys/keys.js'

class Teachermain extends Component {
    state = {
        invalid: '',
        vemail: '',
        vpword: '',
        logindisp: true,
        errmsg: ''
    };


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };


    // templogin = (event) => {
    //     event.preventDefault();
    //     console.log("Use myemail@yahoo.com and welcome to enter site ");
    //     console.log(this.state.vemail, this.state.vpword);

    //     if (this.state.vemail === "myemail@yahoo.com" &&
    //         this.state.vpword === "welcome") {

    //         this.setState({
    //             invalid: false,
    //         this.setState({ invalid: true });
    //     }
    // }


    logincheck = (event) => {
            event.preventDefault();
            //  console.log(this.state.vemail, this.state.vpword);
            axios.post('/auth/login', {
                loginemail: this.state.vemail.toLocaleLowerCase(),
                password: this.state.vpword,
                usertype: 'teacher'
            })
            .then((response) => {
                  
                        this.setState({
                            invalid: false,
                            logindisp: false,
                            errmsg: ''
                        },()=>{
                            console.log("Teacher Login",response);
                        });
                        
                        this.props.validLogin({
                            role:"Board Member",
                            username:"temp"});
                  

            })
            .catch((error) => {
                    console.log("Error in ---", error);//end axios call
                    this.setState({
                        invalid: true
                    });
            });
    } // end login check



    render() {
            return (<div>
                {this.state.logindisp ?
                    <div className="container middlecontent">
                        <div>
                            <form className="inputsection">
                                <h3>Board Member Login</h3>
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


                                <button className="createbutton" id="blogin" onClick={this.logincheck}>Login</button>
                            
                                {/* <div>
                                    <button className="createbutton" id="tlogin" onClick={this.templogin}>Temp Login</button>
                                    <p>Hint: (email:myemail@yahoo.com  password:welcome)</p>
                                </div> */}
                            </form>

                        </div>
                    </div>
                : <Allbatches displayall={true} />
                }

                {this.state.invalid ?
                    <div>
                        <h6 className="errmsg">Invalid Credentials - Please use right credentials</h6>
                    </div>
                    : <div></div>}


            </div>); //end return
    } //end render
} //end class Teacher Main

export default Teachermain;

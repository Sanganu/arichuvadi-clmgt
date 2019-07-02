import React, { Component } from 'react';
import Allbatches from './displayallbatchdetails';
import axios from "axios";
import { Menubar } from '../components/Menubar';
import { connect } from 'react-redux';
import { loginCredentials } from '../reduxAction/dispatchLoginCredentials';

class Boardmember extends Component {
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
                }, () => {
                    console.log("Boardmember Login", response.data);
                    var userobj = {
                        loginemail: response.data.loginemail,
                        usertype: 'boardmember',
                        invalid: false,
                        userfname:response.data.fname,
                        userlname:response.data.lname,
                        userid: response.data._id
                    }
                    console.log("In BoardmemberLogin -",userobj);
                    this.props.setCredetials(userobj);
                });
            })
            .catch((error) => {
                console.log("Error in ---", error);//end axios call
                this.setState({
                    invalid: true,
                    errmsg: "Invalid credentials! Please enter valid Login and password"
                });
            });
    } // end login check



    render() {
        // console.log(this.props);
        return (<div className="container middlecontent">
            {this.state.logindisp ?
                <div>
                    <h6 className="errmsg">{this.state.errmsg}</h6>
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
                    </form>
                </div>
                : <Allbatches displayall={true} />
            }
        </div>); //end return
    } //end render
} //end class Teacher Main


    const mapDispatchToProps = (dispatch) => {
        return {
            setCredetials: (userCred) => {
                dispatch(loginCredentials(userCred))
            }
        }
    }
    export default connect(null, mapDispatchToProps)(Boardmember);

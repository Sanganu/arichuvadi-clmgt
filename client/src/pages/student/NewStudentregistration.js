import React, { Component } from 'react';
// import axios from 'axios';
// import Allstudents from './displayallstudents';
import API from "../../API/Student"

import { CheckPassword } from '../../components/Inputvalidations';

class Studentregistration extends Component {
    state = {
        studentfname: "",
        studentlname: "",
        loginemail: "",
        parentname: "",
        parentphonenumber: "",
        password: "",
        levelcompleted: "",
        errmsg: ''
    }               
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.name : target.value;
        const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
        //console.log('The Value in input change',value,name);

        this.setState({
            [name]: value
        });
    } // end od handleInputChange

    handleStudentCreation = (event) => {
        event.preventDefault();
        console.log("In Student Creation");
        if (this.state.studentfname === "" ||
            this.state.studentlname === "" ||
            this.state.loginemail === "" ||
            this.state.parentname === "" ||
            this.state.parentphonenumber === "" ||
            this.state.password === "") {
            console.log("Empty fields not accepted");
            this.setState({ errmsg: " Empty fields not accepted" })
        }
        else {
            if (CheckPassword(this.state.password)) {
                console.log('Pass')
            }
            let newstudent =  {
                studentfname: this.state.studentfname,
                studentlname: this.state.studentlname,
                parentname: this.state.parentname,
                loginemail: this.state.loginemail,
                password: this.state.password,
                parentphonenumber: this.state.parentphonenumber
              }
                API.createNewStudent(newstudent)
                .then(res => {
                    console.log("The response from adding student", res);
          
                            this.setState({
                                studentfname: '',
                                studentlname: '',
                                parentname: '',
                                loginemail: '',
                                parentphonenumber: '',
                                completedcourse: '',
                                completedlevel: '',
                                errmsg: "Student details registered, A Board member will review your details and contact as soon as possible"
                            })


                })
                .catch(error => {
                    this.setState({ errmsg: "Student Email already exist" });
                    console.log("Error!!!!", error)
                }); // End of axios
           } //end if
    }; // end of handleStudentCreation



    render() {

        return (
            <div>

                <h3 className="subhead">Student Registration</h3>
                <p className="errmsg">{this.state.errmsg}</p>

                <form className="inputsection container">
                    <div className="row">
                        <div className="col-md-6 m-3 p-3">
                            <div className="form-group row">
                                <label className="has-float-label">Student FirstName</label>
                                <input className="form-control" type="text" value={this.state.studentfname} onChange={this.handleInputChange} placeholder="Student Firstname" name="studentfname" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Student LastName</label>
                                <input type="text" className="form-control" placeholder="Student Last name" value={this.state.studentlname} onChange={this.handleInputChange} name="studentlname" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Parent Name</label>
                                <input type="text" className="form-control" placeholder="Parent Name" value={this.state.parentname} onChange={this.handleInputChange} name="parentname" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Parent Email(login email)</label>
                                <input type="text" className="form-control" placeholder="Login Email" value={this.state.loginemail} onChange={this.handleInputChange} name="loginemail" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Password(Please not this down)</label>
                                <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">ReType Password</label>
                                <input type="password" className="form-control" placeholder="Retype Password" value={this.state.password1} onChange={this.handleInputChange} name="password1" />
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Phone Number</label>
                                <input type="text" className="form-control" placeholder="Phone number" value={this.state.parentphonenumber} onChange={this.handleInputChange} name="parentphonenumber" />
                            </div>
                        </div>
                        <div className="col-md-6 m-3 p-3">
                            <div className="form-group row">
                                <label className="has-float-label">Completed Course : </label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.completedcourse} name="completedcourse" >
                                    <option value='None' default>None</option>
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Advance'>Advance</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Completed Level : </label>
                                <select className="form-control droplist" value={this.state.completedlevel} onChange={this.handleInputChange} name="completedlevel" >
                                    <option value='None' default>None</option>
                                    <option value='Oral'>Oral Examination</option>
                                    <option value='Visual'>Visual Examination</option>
                                    <option value='Written'>Written Examination</option>
                                    <option value='Online'>Online Examination</option>
                                    <option value='Offline'>Offline Examination</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Requesting Course : </label>
                                <select className="form-control droplist"
                                    onChange={this.handleInputChange}
                                    value={this.state.completedcourse} name="requestcourse" >
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Intermediate'>Intermediate</option>
                                    <option value='Advance'>Advance</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="has-float-label">Requesting Level : </label>
                                <select className="form-control droplist" value={this.state.requestlevel} onChange={this.handleInputChange} name="requestlevel" >
                                    <option value='Oral'>Oral Examination</option>
                                    <option value='Visual'>Visual Examination</option>
                                    <option value='Written'>Written Examination</option>
                                    <option value='Online'>Online Examination</option>
                                    <option value='Offline'>Offline Examination</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button className="createbutton" name="clcreation" onClick={this.handleStudentCreation}>Create Student account</button>
                </form>
                <br />


            </div>
        ) //end return
    } // end render

} // end class

export default Studentregistration;

import React, { Component } from 'react';
import axios from 'axios';
import Allstudents from './displayallstudents';

import { CheckPassword } from '../components/Inputvalidations';

class Studentregistration extends Component {
  state = {
    studentfname: "",
    studentlname: "",
    loginemail: "",
    parentname: "",
    parentphonenumber: "",
    password: "",
    levelcompleted: "",
    studentrecs: [],
    errmsg: ''
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.name : target.value;
    const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
    //console.log('The Value in input change',value,name);

    this.setState({
      [name]: value
    } /*,
       () =>{
         console.log('Set State in Main Section',value,name);
       } */);
  };

  handleStudentCreation = (event) => {
    event.preventDefault();
    console.log("In Student Creation");
    let strecs = this.state.studentrecs;
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
      axios.post('/api/teacher/student/new',
        {
          studentfname: this.state.studentfname,
          studentlname: this.state.studentlname,
          parentname: this.state.parentname,
          loginemail: this.state.loginemail,
          password: this.state.password,
          parentphonenumber: this.state.parentphonenumber,
          batchid: this.props.batchdet.bid || this.props.bid
        })
        .then(res => {
          console.log("The response from adding student", res);
          let newstrec = {
            stdfname: res.data.studentfname,
            stdlname: res.data.studentlname,
            stdemail: res.data.loginemail,
            phonenumber: res.data.phonenumber
          }
          strecs.push(newstrec);
          this.setState({ studentrecs: strecs },
            () => {
              this.setState({
                studentfname: '',
                studentlname: '',
                parentname: '',
                loginemail: '',
                parentphonenumber: '',
                completedcourse: '',
                completedlevel: ''
              })

            });
        })
        .catch(error => {
          this.setState({ errmsg: "Student Email already exist" });
          console.log("Error!!!!", error)
        }
        ); // End of axios
    } //end if
  }; // end of handleStudentCreation



  render() {
    const bdetails = this.props.batchdet || false;
    return (
      <div>
        {/* <Teacherheader /> */}
        {bdetails ?
          <div>
            <h4 className="text-center">Batch:  {bdetails.batchdesc}</h4>
            <p>Subject:   {bdetails.subject}</p>
            <p>Level: {bdetails.level}</p>
            <p>Rate: {bdetails.rateperhour}$</p>
          </div>
          : <div></div>}
        <br />
        <h3 className="subhead">Add Students to the Batch</h3>
        <p className="errmsg">{this.state.errmsg}</p>

        <form className="form-inline">
          <input type="text" value={this.state.studentfname} onChange={this.handleInputChange} placeholder="Student Firstname" name="studentfname" />
          <input type="text" placeholder="Student Last name" value={this.state.studentlname} onChange={this.handleInputChange} name="studentlname" />
          <input type="text" placeholder="Parent Name" value={this.state.parentname} onChange={this.handleInputChange} name="parentname" />
          <input type="text" placeholder="Login Email" value={this.state.loginemail} onChange={this.handleInputChange} name="loginemail" />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} name="password" />
          <input type="password" placeholder="Retype Password" value={this.state.password1} onChange={this.handleInputChange} name="password1" />
          <input type="text" placeholder="Phone number" value={this.state.parentphonenumber} onChange={this.handleInputChange} name="parentphonenumber" />
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
          {/* <input type="text" placeholder="Level Completed" value={this.state.levelcompleted} onChange={this.handleInputChange} name="levelcompleted" /> */}
          <input type="text" placeholder="" value={this.state.parentphonenumber} onChange={this.handleInputChange} name="parentphonenumber" />
          <button className="createbutton" name="clcreation" onClick={this.handleStudentCreation}>Create Student account</button>
        </form>
        <br />


      </div>
    ) //end return
  } // end render

} // end class

export default Studentregistration;

import React, { Component } from 'react';
import axios from 'axios';
import Allstudents from './displayallstudents';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Addstudent extends Component {
    state = {
          studentfname: "",
          studentlname: "",
          loginemail: "",
          parentname: "",
          parentphonenumber: "",
          studentrecs: [],
          errmsg:''
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
       if( this.state.studentfname === "" ||
            this.state.studentlname === "" ||
             this.state.loginemail === "" ||
             this.state.parentname === "" ||
             this.state.parentphonenumber === "")
             {
               console.log("Empty fields not accepted");
               this.setState({errmsg: " Empty fields not accepted"})
             }
        else {
        axios.post('/api/teacher/student/new',
                  {
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname: this.state.parentname,
                    loginemail: this.state.loginemail,
                    parentphonenumber: this.state.parentphonenumber,
                    batchid: this.props.batchdet.bid
                  })
                  .then(res =>
                    {
                       console.log("The response from adding student",res);
                      let newstrec = {
                          stdfname : res.data.studentfname,
                          stdlname : res.data.studentlname,
                          stdemail : res.data.loginemail,
                          stduname: res.data.uname,
                          stdpwd: res.data.pwd
                      }
                      strecs.push(newstrec);
                      this.setState({studentrecs : strecs},
                          () => {
                            this.setState({
                                  studentfname: '',
                                  studentlname: '',
                                  parentname: '',
                                  loginemail: '',
                                  parentphonenumber: '',
                            })
                          });
                    })
                  .catch(error =>{
                     this.setState({errmsg:"Student Email already exist"});
                     console.log("Error!!!!",error)}
                ); // End of axios
              } //end if
    }; // end of handleStudentCreation



      render() {
        const bdetails = this.props.batchdet;
            return(
              <div>
                 <Teacherheader />
                    <div>
                            <h4 className = "text-center">Batch:  {bdetails.batchdesc}</h4>
                            <p>Subject:   {bdetails.subject}</p>
                            <p>Level: {bdetails.level}</p>
                            <p>Rate: {bdetails.rateperhour}$</p>
                     </div>


                    <br />
                    <form className="form-inline">
                                <h3 className = "subhead">Add Students to the Batch</h3>
                                <p className="errmsg">{this.state.errmsg}</p>
                                <div className = "form-group row">
                                      <label forhtml="studentfname">Student Firstname </label>
                                      <input type = "text"   value={this.state.studentfname} onChange = {this.handleInputChange} name = "studentfname" id = "studentfname" />
                                  </div>
                                  <div className = "form-group row">
                                       <label forhtml="studentlname">Student Lastname  </label>
                                       <input type = "text"   value={this.state.studentlname} onChange = {this.handleInputChange} name = "studentlname" id = "studentlname" />
                                  </div>
                                  <div className = "form-group row">
                                    <label forhtml="parentname">Parent/Guardian name   </label>
                                    <input type = "text"   value={this.state.parentname} onChange = {this.handleInputChange} name = "parentname" id = "parentname" />
                                  </div>
                                    <div className = "form-group row">
                                         <label forhtml="loginemail">Email </label>
                                         <input type = "text"   value={this.state.loginemail} onChange = {this.handleInputChange} name = "loginemail" id = "loginemail" />
                                    </div>
                                    <div className = "form-group row">
                                        <label forhtml="parentphonenumber">Parent Phone number</label>
                                        <input type = "text"   value={this.state.parentphonenumber} onChange = {this.handleInputChange} name = "parentphonenumber" id = "parentphonenumber" />
                                     </div>
                                     <button className = "btn btn-info"  name = "clcreation" onClick = {this.handleStudentCreation}>Create Student account</button>
                    </form>
                     <br />
                      <h6 className ="tablehead">Student Details </h6>
                      <div className = "table-responsive">
                            <table className = "table table-hover">
                            <tbody>
                             <tr>
                                  <th>Firstname</th>
                                  <th>Lastname</th>
                                  <th>Email</th>
                                  <th>Username</th>
                                  <th>Password</th>
                             </tr>

                               <Allstudents studentrec = {this.state.studentrecs}/>
                            </tbody>
                            </table>
                      </div>
                      <Footer />
              </div>
            ) //end return
      } // end render

} // end class

export default Addstudent;

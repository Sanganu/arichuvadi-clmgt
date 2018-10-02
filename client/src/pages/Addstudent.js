import React, { Component } from 'react';
import axios from 'axios';
import Allstudents from './displayallstudents';
// import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Addstudent extends Component {
  state = {
      studentfname: "",
      studentlname: "",
      loginemail: "",
      parentname: "",
      parentphonenumber: "",
      password: "",
      errmsg:''
    };
    
  

    handleInputChange = (event) => { 
      const target = event.target;
      const value = target.type === 'checkbox' ? target.name : target.value;
      const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
      //console.log('The Value in input change',value,name);
      this.setState({
         [name]: value
       });
    };
 
    handleStudentCreation = (event) => {
       event.preventDefault();
       let strecs = this.state.studentrecs;
       if( this.state.studentfname === "" ||
           this.state.studentlname === "" ||
           this.state.loginemail === "" ||
           this.state.parentname === "" ||
           this.state.parentphonenumber === "" ||
           this.state.password === "")
           {
               console.log("Empty fields not accepted");
               this.setState({errmsg: " Empty fields not accepted"})
             }
         else {
        axios.post('/api/teacher/batch/student/new',
                  {   
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname: this.state.parentname,
                    loginemail: this.state.loginemail,
                    password: this.state.password,
                    parentphonenumber: this.state.parentphonenumber,
                    batchid: this.props.batchdet.bid || this.props.bid
                  })
                  .then(res =>
                    {
                       console.log("The response from adding student",res);
                      let newstrec = {
                          stdid: res.data._id,
                          stdfname : res.data.studentfname,
                          stdlname : res.data.studentlname,
                          stdemail : res.data.loginemail,
                          phonenumber: res.data.phonenumber
                      };
                      this.setState({
                                  studentfname: '',
                                  studentlname: '',
                                  parentname: '',
                                  loginemail: '',
                                  parentphonenumber: '',
                      });
                      this.props.newStudent(newstrec);
                    })
                  .catch(error =>{
                     this.setState({errmsg:"Student Email already exist"});
                     console.log("Error - student email already exist !!!!",error)}
                ); // End of axios
              } //end if  
    }; // end of handleStudentCreation
   


      render() {      
        // const bdetails = this.props.batchdet || false;
            return(
              <div>
                                <br />
                    <h3 className = "subhead">Add New  Students to the Batch</h3>
                    <p className="errmsg">{this.state.errmsg}</p>
                              
                    <form className="form-inline">
                                      <input type = "text"  value={this.state.studentfname} onChange = {this.handleInputChange} placeholder = "Student Firstname" id = "studentfname" name =  "studentfname" />
                                       <input type = "text"  placeholder = "Student Last name" value={this.state.studentlname} onChange = {this.handleInputChange} name = "studentlname" id = "studentlname" />
                                       <input type = "text" placeholder = "Parent name"  value={this.state.parentname} onChange = {this.handleInputChange} name = "parentname" id = "parentname" />
                                       <input type = "text"  placeholder = "Login Email" value={this.state.loginemail} onChange = {this.handleInputChange} name = "loginemail" id = "loginemail" />
                                       <input type = "password" placeholder = "password"  value={this.state.password} onChange = {this.handleInputChange} name = "password" id = "password" />
                                       <input type = "text"   placeholder = "Phone number" value={this.state.parentphonenumber} onChange = {this.handleInputChange} name = "parentphonenumber" id = "parentphonenumber" />
                                       <button className = "createbutton"  name = "creation" onClick = {this.handleStudentCreation}>Create Student account</button>
                    </form>
                     <br />
{/*                       
                      <Footer /> */}
              </div>
            ) //end return
      } // end render

} // end class

export default Addstudent;

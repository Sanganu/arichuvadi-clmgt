import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Homepage from './Homepage.js';


class Addstudent extends Component {
  state = {
      studentfname: "",
      studentlname: "",
      loginemail: "",
      parentname: "",
      parentphonenumber: "",
      password: "",
      errmsg:'',
      retypepassword:''
    };
      
  

    handleInputChange = (event) => { 
      const target = event.target;
      const value = target.type === 'checkbox' ? target.name : target.value;
      const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
      //console.log('The Value in input change',value,name);
      this.setState({
         [name]: value,
         errmsg:""
       });
    };
 
    handleStudentCreation = (event) => {
       event.preventDefault();
       
       if( this.state.studentfname === "" ||
           this.state.studentlname === "" ||
           this.state.loginemail === "" ||
           this.state.parentname === "" ||
           this.state.parentphonenumber === "" ||
           this.state.retypepassword === " " ||
           this.state.password === "")
           {
               console.log("Empty fields not accepted");
               this.setState({errmsg: " Empty fields not accepted"})
             }
        else if(this.state.retypepassword === this.state.password){
           console.log("Passwords mismatch");
           this.setState({errmsg: " Mismatch Password and Confirm password"})
        }
         else {
           console.log("Add student");
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
                  .then((res) =>
                    {
                       
                      let newstrec = {
                          stdid: res.data.stdid,
                          stdfname : res.data.studentfname,
                          stdlname : res.data.studentlname,
                          stdemail : res.data.loginemail,
                          phonenumber: res.data.phonenumber
                      };
                      console.log("The response from adding student",res,newstrec);
                      this.setState({
                                  studentfname: '',
                                  studentlname: '',
                                  parentname: '',
                                  password:'',
                                  loginemail: '',
                                  parentphonenumber: '',
                                  levelcompleted:""
                      });
                      this.props.newStudent(newstrec);
                    })
                  .catch(error =>{
                    
                     this.setState({
                      studentfname: '',
                      studentlname: '',
                      parentname: '',
                      password:'',
                      loginemail: '',
                      parentphonenumber: '',
                      levelcompleted:"",
                      levelrequested:"",
                      errmsg:"Student Email already exist"
                      }); // Set state
                     console.log("Error - student email already exist !!!!",error)}
                ); // End of axios
              } //end if  
    }; // end of handleStudentCreation
   


      render(){      
        // const bdetails = this.props.batchdet || false;
       
           if (this.props.usertype === "boardmember"){
            return(
              <div>
                   <p className="errmsg">{this.state.errmsg}</p>
                    <form className ="inputsection">
                                  <div className = "form-group">
                                      <label className="form-control-placeholder">
                                      Firstname</label>
                                      <input type = "text" 
                                       value={this.state.studentfname} 
                                       onChange = {this.handleInputChange} 
                                       placeholder = "Student Firstname"
                                       className = "form-control"
                                       id = "studentfname"
                                       name =  "studentfname" />
                                  </div>
                                  <div className = "form-group">
                                       <label className="form-control-placeholder">
                                       Lastname</label>
                                       <input type = "text"  
                                       placeholder = "Student Lastname" 
                                       value={this.state.studentlname}
                                       onChange = {this.handleInputChange} 
                                       className = "form-control"
                                       name = "studentlname"
                                       id = "studentlname" />
                                  </div>     
                                  <div className = "form-group">
                                       <label className="form-control-placeholder">
                                       Parent</label>
                                       <input type = "text" 
                                       placeholder = "Parent name" 
                                       className = "form-control"
                                       value={this.state.parentname}
                                       onChange = {this.handleInputChange}
                                       name = "parentname" 
                                       id = "parentname" />
                                  </div>    
                                  <div className = "form-group">
                                      <label className="form-control-placeholder">
                                      Username</label> 
                                       <input type = "text"  
                                       placeholder = "Username"
                                       value={this.state.loginemail} 
                                       className ="form-control"
                                       onChange = {this.handleInputChange} 
                                       name = "loginemail" 
                                       id = "loginemail" />
                                  </div>
                                  <div className = "form-group">
                                       <label className="form-control-placeholder">
                                       Password</label>
                                       <input type = "password" 
                                       placeholder = "password"  
                                       className = "form-control"
                                       value={this.state.password} 
                                       onChange = {this.handleInputChange} 
                                       name = "password" id = "password" />
                                  </div>
                         
                                  <div className = "form-group">
                                       <label className ="form-control-placeholder">
                                       Phone</label>    
                                       <input type = "text"   
                                       placeholder = "Phone number" 
                                       value={this.state.parentphonenumber} 
                                       className = "form-control"
                                       onChange = {this.handleInputChange} 
                                       name = "parentphonenumber" 
                                       id = "parentphonenumber" />
                                  </div>  
                                   <div className="form-group row">
                                        <label className="has-float-label">Level Completed :  </label>
                                      <select className="form-control droplist" value={this.state.levelcompleted} onChange={this.handleInputChange} name="levelcompleted" id="levelcompleted">
                                          <option value='Oral' default>Oral Examination</option>
                                          <option value='Visual'>Visual Examination</option>
                                          <option value='Written'>Written Examination</option>
                                          <option value='Online'>Online Examination</option>
                                          <option value='Offline'>Offline Examination</option>
                                      </select>
                                      </div>   
                                      <div className="form-group row">
                                        <label className="has-float-label">Level Requested :  </label>
                                      <select className="form-control droplist" value={this.state.levelrequested} onChange={this.handleInputChange} name="levelrequested" id="levelrequested">
                                          <option value='Oral' default>Oral Examination</option>
                                          <option value='Visual'>Visual Examination</option>
                                          <option value='Written'>Written Examination</option>
                                          <option value='Online'>Online Examination</option>
                                          <option value='Offline'>Offline Examination</option>
                                      </select>
                                   </div>  
                                       <button  
                                        className = "rowbtn" 
                                        name = "creation"
                                        onClick = {this.handleStudentCreation}>
                                        <i className="fa fa-address-card"></i>
                                        Add Student</button>
                    </form>
              </div>
            ) //end return
          }
          else{
               return(<Homepage msg="Only Board members can add students ...Please login as Boardmember or contact Board member" />)
          }
      } // end render

} // end class

 
const mapStateToProps = (state) => { 
  console.log("Map State to Props : ",state);
  return {
    loginemail:state.loginemail,
    userfname:state.userfname,
    userlname:state.userlname,
    usertype:state.usertype,
    userid:state.userid
  }
}

export default connect(mapStateToProps)(Addstudent);

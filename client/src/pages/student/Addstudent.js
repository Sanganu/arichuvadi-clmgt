import React, { Component } from 'react';
import {connect} from 'react-redux';
import Homepage from '../general/Homepage.js';
import API from "../../API/Student";


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
      //console.log('The Value in Form.Control change',value,name);
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
           console.log("Add student",this.props);
           API.addNewStudentToBatch(
                  {   
                    studentfname: this.state.studentfname,
                    studentlname: this.state.studentlname,
                    parentname: this.state.parentname,
                    loginemail: this.state.loginemail,
                    password: this.state.password,
                    parentphonenumber: this.state.parentphonenumber,
                    batchid: this.props.bid||""
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
       
           if (this.props.usertype === "management"){
            return(
              <div>
                   <p className="errmsg">{this.state.errmsg}</p>
                    <Form>
                                  <Form.Group>
                                      <Form.Label className="form-control-placeholder">
                                      Firstname</Form.Label>
                                      <Form.Control type = "text"
                                       value={this.state.studentfname} 
                                       onChange = {this.handleInputChange} 
                                       placeholder = "Student Firstname"
                                       className = "form-control"
                                       id = "studentfname"
                                       name =  "studentfname" />
                                  </Form.Group>
                                  <Form.Group>
                                       <Form.Label className="form-control-placeholder">
                                       Lastname</Form.Label>
                                       <Form.Control type = "text"  
                                       placeholder = "Student Lastname" 
                                       value={this.state.studentlname}
                                       onChange = {this.handleInputChange} 
                                       className = "form-control"
                                       name = "studentlname"
                                       id = "studentlname" />
                                  </Form.Group>     
                                  <div className = "form-group">
                                       <Form.Label className="form-control-placeholder">
                                       Parent</Form.Label>
                                       <Form.Control type = "text" 
                                       placeholder = "Parent name" 
                                       className = "form-control"
                                       value={this.state.parentname}
                                       onChange = {this.handleInputChange}
                                       name = "parentname" 
                                       id = "parentname" />
                                  </div>    
                                  <div className = "form-group">
                                      <Form.Label className="form-control-placeholder">
                                      Username</Form.Label> 
                                       <Form.Control type = "email"  
                                       placeholder = "Username"
                                       value={this.state.loginemail} 
                                       className ="form-control"
                                       onChange = {this.handleInputChange} 
                                       name = "loginemail" 
                                       id = "loginemail" />
                                  </div>
                                  <div className = "form-group">
                                       <Form.Label className="form-control-placeholder">
                                       Password</Form.Label>
                                       <Form.Control type = "password" 
                                       placeholder = "password"  
                                       className = "form-control"
                                       value={this.state.password} 
                                       onChange = {this.handleInputChange} 
                                       name = "password" id = "password" />
                                  </div>
                         
                                  <div className = "form-group">
                                       <Form.Label className ="form-control-placeholder">
                                       Phone</Form.Label>    
                                       <Form.Control type = "text"   
                                       placeholder = "Phone number" 
                                       value={this.state.parentphonenumber} 
                                       className = "form-control"
                                       onChange = {this.handleInputChange} 
                                       name = "parentphonenumber" 
                                       id = "parentphonenumber" />
                                  </div>  
                                   <Form.Group>
                                        <label className="has-float-label">Level Completed :  </label>
                                      <Form.Control as="select" value={this.state.levelcompleted} onChange={this.handleInputChange} name="levelcompleted" id="levelcompleted">
                                          <option value='Oral' default>Oral Examination</option>
                                          <option value='Visual'>Visual Examination</option>
                                          <option value='Written'>Written Examination</option>
                                          <option value='Online'>Online Examination</option>
                                          <option value='Offline'>Offline Examination</option>
                                      </Form.Control>
                                      </Form.Group>   
                                      <Form.Group>
                                        <label className="has-float-label">Level Requested :  </label>
                                      <Form.Control  as="select" value={this.state.levelrequested} onChange={this.handleInputChange} name="levelrequested" id="levelrequested">
                                          <option value='Oral' default>Oral Examination</option>
                                          <option value='Visual'>Visual Examination</option>
                                          <option value='Written'>Written Examination</option>
                                          <option value='Online'>Online Examination</option>
                                          <option value='Offline'>Offline Examination</option>
                                      </Form.Control>
                                   </Form.Group>  
                                       <Button
                                        onButton = {this.handleStudentCreation}>
                                        <i className="fa fa-address-card"></i>
                                        Add Student</Button>
                    </Form>
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

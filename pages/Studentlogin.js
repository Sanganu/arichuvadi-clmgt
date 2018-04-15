import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import Studentmain from './Studentmain';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Studentlogin extends Component
{
             constructor(props)
                 {
                   super(props);
                   this.state = {
                          vemail:'',
                          vpword:'',
                          vuname: '',
                          showstlogin: true,
                          studentrecord:{},
                          classdet:[]
                     };

                 } //end constructor
                 handleInputChange = (event) => {
                       const target = event.target;
                       const value = target.value;
                       const name  = target.name;
                       //console.log('The Value in input c hange',value,name);

                       this.setState({
                          [name]: value
                        } /*,
                        () =>{
                          console.log('Set State in Main Section',value,name);
                        } */);
                 }; //end handle input cjange


                 logincheck = (event) => {
                       event.preventDefault();
                       console.log("Student's Login");
                       if (this.state.vemail === "" ||
                           this.state.vpword === "" ||
                           this.state.vuname === "")
                           {
                              console.log('Enter Valid Credentials in all fields');
                              this.setState({invalid:true,
                                              errmsg: "Blank fields .. Enter valid credentials"});

                           }
                        else {
                          console.log(this.state.vemail, this.state.vpword,this.state.vuname);
                           axios.post('/api/others/student/login',
                                  {
                                    semail: this.state.vemail,
                                    suname : this.state.vuname,
                                    spword: this.state.vpword
                                  })
                                  .then( (response) =>{
                                         console.log("The response from axios",response);
                                         console.log("The classes details", response.data.classes);
                                         if ( response.data.studentrecord)
                                         {
                                         this.setState({    showstlogin:false,
                                                            studentrecord:(response.data.studentrecord),
                                                            classdet:(response.data.classes)},
                                                            () => {
                                                              console.log("State updates",this.state.studentrecord);
                                                            });
                                          }
                                          else {
                                            console.log("Error in validating student login - student login does not exist",);
                                            this.setState({
                                                           errmsg: "Invaild Student login exist .. Enter valid credentials or Contact your Teacher",
                                                           showstlogin: true
                                                           });
                                          }
                                   })
                                   .catch((error) => {

                                       console.log("Error in validating student login ",error);
                                       this.setState({
                                                      errmsg: "Invaild Student login exist .. Enter valid credentials or Contact your Teacher",
                                                      showstlogin: true
                                                      });
                                   });
                          } //end else

                 } // end login check


                  render()
                  {
                          return(<div>
                                       <Teacherheader/>
                                       {this.state.showstlogin ?
                                         <div className = "tloginsection container">
                                            <div>
                                                  <h3>Student Login </h3>
                                                  <div>
                                                       <h5 className ="errmsg">{this.state.errmsg}</h5>
                                                        <form className="inputsection">
                                                            <div className = "form-group">
                                                                <label id ="lemail">Email Addess</label><br />
                                                                <input className="textarea" onChange = {this.handleInputChange} type="text" name="vemail" value={this.state.vemail} /><br />
                                                            </div>
                                                            <div className = "form-group">
                                                                <label id ="lemail">User Name</label><br />
                                                                <input className="textarea" onChange = {this.handleInputChange} type="text" name="vuname" value={this.state.vuname} /><br />
                                                            </div>
                                                             <div className = "form-group">
                                                                <label id = "lpsword">Password</label><br />
                                                                <input className="textarea" onChange = {this.handleInputChange} type="password" name="vpword" value ={this.state.vpword} /><br />
                                                             </div>
                                                             <br />
                                                               <button className ="btn btn-lg-info" id = "blogin" onClick={this.logincheck}>Login</button>
                                                         </form>
                                                   </div>
                                              </div>
                                         </div>
                                        :  <div><Studentmain studentdet = {this.state.studentrecord}
                                                        classrecords = {this.state.classdet} /></div>}
                                      <Footer />
                              </div>) //end return
                  } //end render

} //end class Student Main


export default Studentlogin;

import React, {Component } from 'react';
import axios from 'axios';

class CreateTeacherAccount extends Component{

      construtor(props){
        super(props)
      }

      handleInputChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name  = target.name;
            //console.log('The Value in input change',value,name);

            this.setState({
               [name]: value
             });
      };
            handleTeacherAccountCreation = (event) => {
                    event.preventDefault();
                     console.log("In Teacher Account Creation state values",this.state);
                     //var myDate = new Date(this.state.startdate);
                     if(  this.state. === "" ||
                         this.state.subject === "" ||
                         this.state.level === "" ||
                        this.state.rateperhour === "")
                        {
                          console.log("No Empty Fields Enter valid data");
                          this.setState({errmsg : "No Empty Fields Enter valid data"});
                        }
                    else {
                     axios.post('/api/teacher/new',
                              {

                              })
                          .then(response =>
                            {
                                console.log("The response createe Teacher Account",response);
                                console.log("The  inserted record ID",response.data._id);

                                let newteacher = {
                                    
                                }
                                5

                                //window.location = '/teacher/batch/addstudent/'+response._id;
                                //return <Addstudent />
                            })
                            .catch(error => {
                                this.setState({errmsg: error.errstring +" Please check console for further details"},() =>
                                 {
                                     console.log("Error in Adding Batch",error.err);
                                 });

                            }); //end new batch creation - axios call
                          } //end if
                }; // end handleclasscreation

     render()
     {
        return(<div>
                      <form className = "form-horizontal">
                          <h5 className = "subcr">Create New Batch</h5>
                          <p className="errmsg">{this.state.errmsg}</p>
                            <div className = "form-group">
                               <label className ="inline">Batch Description  </label>
                               <input type = "text"   value={this.state.batchdesc} onChange = {this.handleInputChange} name = "batchdesc" /><br />
                           </div>
                           <div className = "form-group">
                                   <label className ="inline">Subject :   </label>
                                   <select  value={this.state.subject} onChange = {this.handleInputChange} name ="subject" id="subject">
                                       <option value ='Music'>Music</option>

                                        <option value ='Dance'>Dance</option>
                                   </select><br />
                           </div>
                           <div className = "form-group">
                               <label className ="inline">Rate per class per student($) </label>
                               <input type = "text"   value={this.state.rateperhour} onChange = {this.handleInputChange} name = "rateperhour" />
                          </div>
                          <div className = "form-group">
                               <label className ="inline">Level : </label>
                               <select onChange = {this.handleInputChange} name ="level" id="level">
                                   <option value ='Beginner'>Beginner</option>
                                     <option value ='Intermediate'>Intermediate</option>
                                   <option value ='Advance'>Advance</option>
                               </select>
                          </div>
                           <button className = "btn btn-info"  name = "clcreation" onClick = {this.handleClassCreation}>Create Batch</button>
                      </form>
             </div>) // end  of return
     }// end of render
} // end of component

export default CreateTeacherAccount;

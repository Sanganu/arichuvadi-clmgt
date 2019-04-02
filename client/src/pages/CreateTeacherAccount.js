import React, {Component } from 'react';
import axios from 'axios';

class CreateTeacherAccount extends Component{

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name  = target.name;
        this.setState({
            [name] : vale
        },() => {
           console.log('The Value in input change',value,name);
        });
        
    }

     
          
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

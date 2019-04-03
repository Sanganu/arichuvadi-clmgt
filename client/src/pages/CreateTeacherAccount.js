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
                          <h5 className = "subcr">Create Teacher Account</h5>
                          <p className="errmsg">{this.state.errmsg}</p>
                            <div className = "form-group">
                               <label className ="inline">Firstname  </label>
                               <input type = "text"   value={this.state.fname} onChange = {this.handleInputChange} name = "fname" /><br />
                           </div>
                           <div className = "form-group">
                                   <label className ="inline">Lastname   </label>
                                   <input type = "text"   value={this.state.lname} onChange = {this.handleInputChange} name = "lname" /><br />
                           </div>
                           <div className = "form-group">
                               <label className ="inline">Email</label>
                               <input type = "text"   value={this.state.email} onChange = {this.handleInputChange} name = "email" />
                          </div>
                          <div className = "form-group">
                               <label className ="inline">Level : </label>
                               <select onChange = {this.handleInputChange} name ="level" id="level">
                                   <option value ='Beginner'>Beginner</option>
                                     <option value ='Intermediate'>Intermediate</option>
                                   <option value ='Advance'>Advance</option>
                               </select>
                          </div>
                           <button className = "btn btn-info"  name = "teachercreation" onClick = {this.handleClassCreation}>Create Teacher Account</button>
                      </form>
             </div>) // end  of return
     }// end of render
} // end of component

export default CreateTeacherAccount;

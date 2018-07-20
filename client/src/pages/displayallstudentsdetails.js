import React,{ Component } from 'react';

class Allstudents extends Component
{
    state = {
        stdfname : this.props.stdfname || '',
        stdlname : this.props.stdlname || '',
        stdemail : this.props.stdemail || '',
        parentname : this.props.parentname || '',
        phonenumber :  this.props.phonenumber || ''
    }
    deleteStudent = () =>{
        console.log("Delete-child")
         this.props.deleteStudentDetails(this.props.stdid)
    }
    updateStudent = () =>{
        console.log("Update Student");
        let stdrecord = {
            studentfname : this.state.stdfname,
            studentlname : this.state.stdlname,
            loginemail : this.state.stdemail,
            parentname : this.state.parentname,
            parentphonenumber : this.state.phonenumber
        }
        this.props.updateStudentDetails(this.props.stdid,stdrecord);
    }
    render()
    {
          
            return(
                  <tr className = "addclass"><td><input type="text" value={this.state.stdfname} onChange={this.handleInputChange} name= "studentfname" /></td>
                       <td><input type="text" value={this.state.stdlname} onChange={this.handleInputChange} name = "studentlname"/></td>
                       <td><input type="text" value={this.state.stdemail} onChange={this.handleInputChange} name="loginemail" /></td>
                       <td><input type="text" value={this.state.parentname} onChange={this.handleInputChange} name="parentname"/></td>
                       <td><input type="text" value={this.state.phonenumber} onChange={this.handleInputChange} name="parentphonenumber" /></td>
                       <td>{this.props.batchdesc}</td>
                       <td>{this.props.subject}</td>
                       <td><button onClick = {this.deleteStudent}>Delete Student details</button></td>
                       <td><button onClick ={this.updaeStudent}>Update Student</button></td>
                  </tr>);
              
    }   
}

export default Allstudents;
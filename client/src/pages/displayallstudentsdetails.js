import React,{ Component } from 'react';

class Allstudents extends Component
{
    deleteStudent = () =>{
        console.log("Delete-child")
         this.props.deleteStudentDetails(this.props.stdid)
    }
    render()
    {
          
            return(
                  <tr className = "addclass"><td>{this.props.stdfname}</td>
                       <td>{this.props.stdlname}</td>
                       <td>{this.props.stdemail}</td>
                       <td>{this.props.parentname}</td>
                       <td>{this.props.phonenumber}</td>
                       <td>{this.props.batchdesc}</td>
                       <td>{this.props.subject}</td>
                       <td>{this.props.stdid}</td>
                       <td><button onClick = {this.deleteStudent}>Delete Student details</button></td>
                       <td></td>
                  </tr>);
              
    }   
}

export default Allstudents;
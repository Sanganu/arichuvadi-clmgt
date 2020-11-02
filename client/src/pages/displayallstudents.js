import React,{ Component } from 'react';
//This is Display of students component used under BatchInfo
// Plan is to delete Student from Batch array
class Allstudents extends Component
{
    deleteStudent = () =>{
        console.log("Delete-child",this.props.studentrec.stdid);
      
        this.props.deleteStudentDetails(this.props.studentrec.stdid);
    }
    render()
    {            return(<tr key={this.props.index}>
                       <td>{this.props.studentrec.stdfname}</td>
                       <td>{this.props.studentrec.stdlname}</td>
                       <td>{this.props.studentrec.stdemail}</td>
                       <td>{this.props.studentrec.phonenumber}</td>
                       <td>{this.props.studentrec.parentname}</td>
                       <td>{this.props.studentrec.levelcompleted}</td>
                       <td>{this.props.studentrec.levelrequested}</td>
                  </tr>)
     }
}

export default Allstudents;

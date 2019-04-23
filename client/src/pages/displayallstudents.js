import React,{ Component } from 'react';
//This is Display students component used under BatchInfo
class Allstudents extends Component
{
    deleteStudent = () =>{
        console.log("Delete-child",this.props.studentrec.stdid);
      
        this.props.deleteStudentDetails(this.props.studentrec.stdid);
    }
    render()
    {            return(<tr key={this.props.index}><td>{this.props.studentrec.stdfname}</td>
                       <td>{this.props.studentrec.stdlname}</td>
                       <td>{this.props.studentrec.stdemail}</td>
                       <td>{this.props.studentrec.phonenumber}</td>
            
                  </tr>)
     }
}

export default Allstudents;

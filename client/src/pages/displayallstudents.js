import React,{ Component } from 'react';

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
                       {/* <td>{this.props.studentrec.stdid}</td> */}
                       <td><button onClick={this.deleteStudent}
                       className = "rowbtn">
                       <i class="fa fa-trash"></i>
                       </button></td>
                       {/* <td></td> */}
                  </tr>)
     }
}

export default Allstudents;
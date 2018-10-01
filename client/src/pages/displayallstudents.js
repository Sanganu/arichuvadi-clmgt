import React,{ Component } from 'react';

class Allstudents extends Component
{
    deleteStudent = () =>{
        console.log("Delete-child");
        this.setState({display : false});
         this.props.deleteStudentDetails(this.props.stdid);
    }
    render()
    {
           
            return(<tr key={this.props.index}><td>{this.props.studentrec.stdfname}</td>
                       <td>{this.props.studentrec.stdlname}</td>
                       <td>{this.props.studentrec.stdemail}</td>
                       <td>{this.props.studentrec.phonenumber}</td>
                       <td><button onClick={this.deleteStudent}>Delete Student</button></td>
                       <td></td>
                  </tr>)
     }
}

export default Allstudents;
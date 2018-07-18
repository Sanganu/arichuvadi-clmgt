import React,{ Component } from 'react';

class Allstudents extends Component
{
    detleteStudent = () =>{
         
    }
    render()
    {
           const studentrec = this.props.studentrec;
           console.log("student",this.props.studentrec);
            return(
                  <tr className = "addclass"><td>{this.props.stdfname}</td>
                       <td>{this.props.stdlname}</td>
                       <td>{this.props.stdemail}</td>
                       <td>{this.props.parentname}</td>
                       <td>{this.props.phonenumber}</td>
                       
                       <td>{this.props.subject}</td>
                       <td><button onClick = {this.detleteStudent}>Delete Student details</button></td>
                       <td></td>
                  </tr>);
              
    }
}

export default Allstudents;
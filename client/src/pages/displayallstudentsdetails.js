import React,{ Component } from 'react';

class Allstudents extends Component
{
    render()
    {
           const studentrec = this.props.studentrec;
           console.log("student",this.props.studentrec);
            return(studentrec.map((data,index) => (
                  <tr className = "addclass" key={index}><td>{data.stdfname}</td>
                       <td>{data.stdlname}</td>
                       <td>{data.stdemail}</td>
                       <td>{data.parentname}</td>
                       <td>{data.phonenumber}</td>
                       <td><button>Delete Student from batch</button></td>
                       <td></td>
                  </tr>))
              );
    }
}

export default Allstudents;
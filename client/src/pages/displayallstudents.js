import React,{ Component } from 'react';

class Allstudents extends Component
{
    render()
    {
           const studentrec = this.props.studentrec || [];
            return(   
                studentrec.map((data,index) => (
                  <tr key={index}><td>{data.stdfname}</td>
                       <td>{data.stdlname}</td>
                       <td>{data.stdemail}</td>
                       <td>{data.phonenumber}</td>
                       <td><button>Delete Student</button></td>
                       <td></td>
                  </tr>))
                  
              );
    }
}

export default Allstudents;
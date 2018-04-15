import React,{ Component } from 'react';

class Allstudents extends Component
{
    render()
    {
           const studentrec = this.props.studentrec;
            return(studentrec.map((data,index) => (
                  <tr key={index}><td>{data.stdfname}</td>
                       <td>{data.stdlname}</td>
                       <td>{data.stdemail}</td>
                       <td>{data.stduname}</td>
                       <td>{data.stdpwd}</td>
                  </tr>))
              );
    }
}

export default Allstudents;

import React,{ Component } from 'react';
//This is Display students component used under BatchInfo
class Teacherrecords extends Component
{
    
    render()
    {            return(<tr key={this.props.index}>
                      <td>{this.props.fname}</td>
                       <td>{this.props.lname}</td>
                       <td>{this.props.email}</td>
                       <td>{this.props.phone}</td>
            
                  </tr>)
     }
}

export default Teacherrecords;

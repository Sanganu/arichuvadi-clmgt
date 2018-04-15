 import React, { Component } from 'react';
 import Allclasses from './displayallclassdetails';

class Studentmain extends Component
{
    state = {
      stfname:'',
      stlname: '',
      stbatchid:'',
      stid:''
    }
    componentWillReceiveProps = () => {
          console.log("props received",this.props);
     }

      render()
      {
           return(<div>

                     <h4 className = "subhead">Welcome {this.props.studentdet.fname}    {this.props.studentdet.lname} </h4>
                     <br />
                           <div>
                                 <p>Parent: {this.props.studentdet.parent}</p>
                                 <p>Username:{this.props.studentdet.uname} </p>
                                 <p>Phone number:{this.props.studentdet.phone}</p>
                                 <p>Subject: {this.props.studentdet.subject}</p>
                                 <p>Email: {this.props.studentdet.email}</p>
                                 <p>Level: {this.props.studentdet.level}</p>
                                 <p>Rate: {this.props.studentdet.rate}</p>
                                  <p>Batch Description: {this.props.studentdet.batch}</p>

                             </div>
                             <Allclasses classrecords = {this.props.classrecords}/>
                 </div>)
      }
}

export default Studentmain;

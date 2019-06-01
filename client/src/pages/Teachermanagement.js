import React, { Component } from 'react';
import axios from 'axios';
import Teacherrecords from './Teacherrecords';

class Teachermanagement extends Component{
    state ={
        teacherrecords:[]
    }
    componentDidMount = () => {
        axios.get('/api/teacher/all')
        .then((response) => {
            console.log("List of teachers",response);
            this.setState({teacherrecords:response.data});
        })
        .catch((error) => {
            console.log("Error in fetching teacher records",error);
        })
    }
    render(){
        const { teacherrecords } = this.state;
        return(<div className = 'middlecontent'>
           <h5 className="subhead">Teacher Records </h5>
            <div className="table-responsive">
                <table className="table table-hover">
                <tbody>
                    <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Password </th>
                    <th>Phonenumber</th>
                    <th>Delete</th>
                    </tr>
                    {teacherrecords.map((data, index) =>
                    <Teacherrecords key={index}
                        fname={data.fname}
                        lname={data.lname}
                        email={data.email}
                        title={data.title}
                      
                        phonenumber={data.phonenumber}
                        // deleteTeacherDetails={this.deleteTeacherDetails}
                    />
                    )}
                </tbody>
                </table>
             </div>   
       </div> )
    }
}

export default Teachermanagement;

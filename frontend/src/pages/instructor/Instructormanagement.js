import React, { Component } from 'react';
import axios from 'axios';
import Teacherrecords from './Instructorrecords';
import Addteacher from './Addinstructor';

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
    handleTeacherCreate = (newTeacher) =>{
        const teacherrecords = {...this.state.teacherrecords,newTeacher};
        //teacherrecords.push(newTeacher);
        this.setState({teacherrecords:teacherrecords},
          () => {
              console.log("Teacher Records",this.state.teacherrecords);
          })
    }
    render(){
        const { teacherrecords } = this.state;
        return(<div className = 'middlecontent'>
          <Addteacher
               handleNewTeacher = {this.handleTeacherCreate}/>
           <h5 className="subhead">Teacher Records </h5>
            <div className="table-responsive">
                <table className="table table-hover">
                <tbody>
                    <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phonenumber</th>
                    </tr>
                    {teacherrecords.map((data, index) =>
                    <Teacherrecords key={index}
                        fname={data.fname}
                        lname={data.lname}
                        email={data.loginemail}
                        title={data.title}
                        phone={data.phone}
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

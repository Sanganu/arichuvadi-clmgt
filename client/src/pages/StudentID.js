import React,{Component} from 'react';
import axios from 'axios';
import Eachstudent from "./Eachstudent";


class StudentID extends Component{
    state = {
        studentrecords : [],
        value:''
    }

    componentDidMount =() => {
   
        axios.get('/api/teacher/student/iddetails/')
        .then((records) => {
          //console.log("Student Records",records);
          this.setState({
              studentrecords:records.data
          },()=>{
              console.log("Student Records",this.state.studentrecords);
          });
        })
        .catch((error) => {
            console.log("Error in fetching student Records",error);
        });
    }

    handleStudentSelect = (event) => {
       this.setState({studentid:event.target.value},()=>{
           console.log("value",event.target.value);
       });
    }

    render(){
        const strecords = this.state.studentrecords;
        return(<div>
            <select value={this.state.value} onChange={this.handleStudentSelect}>
             <option value="selected">Select Student</option>
                {strecords.map
                ((student,index) => 
                        
                        <option value={student._id} key={index}>
                        {student.studentfname} {student.studentlname}
                        </option> 
                )}
             </select>
            </div>)
    }
} 

export default StudentID;

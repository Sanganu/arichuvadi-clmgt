import React,{Component} from 'react';
import axios from 'axios';
import Eachstudent from "./Eachstudent";


class StudentID extends Component{
    state = {
        studentrecords : [],
        value:'',
        studentid:''
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
        // event.preventDefault();
        const studentid = event.target.value;
        const optionlabel = event.target.label;
        console.log("Event",event.target.value,"Label",optionlabel);
        this.setState({studentid:studentid},()=>{
            console.log("value",studentid);
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
                        {student.studentfname} {student.studentlname} {student.loginemail}
                        </option> 
                )}
             </select>
            </div>)
    }
} 

export default StudentID;

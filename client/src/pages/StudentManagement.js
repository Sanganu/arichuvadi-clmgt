import React, { Component } from 'react';
import axios from 'axios';
// import Allstudents from './displayallstudets';
import Allstudents  from './displayallstudentsdetails';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Addstudent extends Component {
    state = {
          studentfname: "",
          studentlname: "",
          loginemail: "",
          parentname: "",
          parentphonenumber: "",
          password: "",
          studentrecords: [],
          errmsg:''
        };

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.name : target.value;
      const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
      //console.log('The Value in input change',value,name);

      this.setState({
         [name]: value
       } /*,
       () =>{
         console.log('Set State in Main Section',value,name);
       } */);
    };

    componentDidMount = (event) => {
        let studentrecords = this.state.studentrecords;
        console.log("ComponentDidmount")
        axios.get("/api/teacher/students/all")
          .then(response =>{
            for(let i = 0;i < response.data.length;i++)
            {
                        let currentrec = {
                            recid: response.data[i]._id,
                            stdfname: response.data[i].studentfname,
                            stdlname: response.data[i].studentlname,
                            stdemail: response.data[i].loginemail,
                            parentname: response.data[i].parentname,
                            phonenumber: response.data[i].parentphonenumnber
                            //batchid: response.data[i].batchid
                            // batchdesc: response.data[i].batchid//.batchdesc,
                            // //subject: response.data[i].batchid.subject
                        }
                        studentrecords.push(currentrec);
            } // end for
            this.setState({studentrecords : studentrecords},() => console.log("Student Management:",studentrecords))
        }) //end then
        .catch(error => {
          console.log("Error is fetching all student records",error);
        })
    }
  
    handleStudentCreation = (event) => {
        event.preventDefault();
       let strecs = this.state.studentrecords;
       if( this.state.studentfname === "" ||
           this.state.studentlname === "" ||
           this.state.loginemail === "" ||
           this.state.parentname === "" ||
           this.state.parentphonenumber === "" ||
           this.state.password === "")
           {
               console.log("Empty fields not accepted");
               this.setState({errmsg: " Empty fields not accepted"})
             }
        else {
            let newrecord = {
                studentfname: this.state.studentfname,
                studentlname: this.state.studentlname,
                parentname: this.state.parentname,
                loginemail: this.state.loginemail,
                password: this.state.password,
                parentphonenumber: this.state.parentphonenumber,
              }
              axios.post('/api/teacher/student/new',
                  {newrecord})
                  .then(res =>
                    {
                       console.log("The response from adding student",res);
                      let newstrec = {
                          stdfname : res.data.studentfname,
                          stdlname : res.data.studentlname,
                          stdemail : res.data.loginemail,
                          phonenumber: res.data.phonenumber
                      }
                      strecs.push(newstrec);
                      this.setState({studentrecords : strecs},
                          () => {
                            this.setState({
                                  studentfname: '',
                                  studentlname: '',
                                  parentname: '',
                                  loginemail: '',
                                  parentphonenumber: '',
                            })
                          });
                    })
                  .catch(error =>{
                     this.setState({errmsg:"Student Email already exist"});
                     console.log("Error!!!!",error)}
                ); // End of axios
            } //end if
    }; // end of handleStudentCreation

    deleteStudentDetails = (id) => {
      axios.delete("/api/teacher/student/delete/:id")
          .then(response => {
            console.log("the reponse",response)
          })
          .catch(error => {
            console.log("Error in deleting student details",error);
          })
    }

      render() {
            const studentrecords = this.state.studentrecords;
            return(
              <div>
                 {/* <Teacherheader /> */}
                    <h3 className = "subhead">Students Record Management</h3>
                    <p className="errmsg">{this.state.errmsg}</p>
                              
                    <form className="form-inline">
                                      <input type = "text"  value={this.state.studentfname} onChange = {this.handleInputChange} placeholder = "Student Firstname" id = "studentfname" name =  "studentfname" />
                                       <input type = "text"  placeholder = "Student Last name" value={this.state.studentlname} onChange = {this.handleInputChange} name = "studentlname" id = "studentlname" />
                                       <input type = "text" placeholder = "Parent name"  value={this.state.parentname} onChange = {this.handleInputChange} name = "parentname" id = "parentname" />
                                       <input type = "text"  placeholder = "Login Email" value={this.state.loginemail} onChange = {this.handleInputChange} name = "loginemail" id = "loginemail" />
                                       <input type = "password" placeholder = "password"  value={this.state.password} onChange = {this.handleInputChange} name = "password" id = "password" />
                                       <input type = "text"   placeholder = "Phone number" value={this.state.parentphonenumber} onChange = {this.handleInputChange} name = "parentphonenumber" id = "parentphonenumber" />
                                       <button className = "createbutton"  name = "creation" onClick = {this.handleStudentCreation}>Create Student account</button>
                    </form>
                     <br />
                      <h6 className ="tablehead">Student Details </h6>
                      <div className = "table-responsive">
                            <table className = "table table-hover">
                            <tbody>
                             <tr>
                                  <th>Firstname</th>
                                  <th>Lastname</th>
                                  <th>Email</th>
                                  <th>Phonenumber</th>
                             </tr>
                              {studentrecords.map((data,index) =>
                                 <Allstudents  index={index}
                                               stdlname = {data.stdlname}
                                               stdid = {data.recid}
                                               stdfname = {data.stdfname}
                                               parentname = {data.parentname}
                                               phonenumber = {data.phonenumber}
                                               subject = {data.subject}
                                               />
                              )}
                            </tbody>
                            </table>
                      </div>
                      <Footer />
              </div>
            ) //end return
      } // end render

} // end class 

export default Addstudent;

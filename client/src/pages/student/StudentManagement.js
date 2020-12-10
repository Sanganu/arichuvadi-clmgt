import React, { Component } from 'react';
import API from '../../API/Student';
import Allstudents from './displayallstudentsdetails';
// import Topmenu from "../components/Topmenu";
// import Teacherheader from '../components/Teacherheader';

class Studentmanagement extends Component {
  state = {
    studentfname: "",
    studentlname: "",
    loginemail: "",
    parentname: "",
    parentphonenumber: "",
    password: "",
    studentrecords: [],
    errmsg: ''
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
    let studentrecords = [];
    
    API.getAllStudents()
      .then(response => {
        console.log("Student Records",response.data)
        
      
        this.setState({ studentrecords: response.data }, () => console.log("Student Management:", this.state.studentrecords))
      }) //end then
      .catch(error => {
        console.log("Error is fetching all student records", error);
      })
  }

  handleStudentCreation = (event) => {
    event.preventDefault();
    let strecs = this.state.studentrecords;
    if (this.state.studentfname === "" ||
      this.state.studentlname === "" ||
      this.state.loginemail === "" ||
      this.state.parentname === "" ||
      this.state.parentphonenumber === "" ||
      this.state.password === "") {
      console.log("Empty fields not accepted");
      this.setState({ errmsg: " Empty fields not accepted" })
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
      API.createNewStudent(newrecord)
        .then(res => {
          console.log("The response from adding student", res);
          let newstrec = {
            recid: res.data._id,
            stdfname: res.data.studentfname,
            stdlname: res.data.studentlname,
            stdemail: res.data.loginemail,
            parentname: res.data.parentname,
            phonenumber: res.data.phonenumber
          }
          strecs.push(newstrec);
          this.setState({ studentrecords: strecs },
            () => {
              this.setState({
                studentfname: '',
                studentlname: '',
                parentname: '',
                loginemail: '',
                parentphonenumber: '',
                password: ''
              })
            });
        })
        .catch(error => {
          this.setState({ errmsg: "Student Email already exist" });
          console.log("Error!!!!", error)
        }
        ); // End of axios
    } //end if
  }; // end of handleStudentCreation

  deleteStudentDetails = (id) => {
    console.log("Deletestudentdetails-id", id);
    API.deleteStudent(id)
      .then(response => {
        console.log("the response", response)
        if (response.status === 200) {
          let newarray = this.state.studentrecords.filter((student) => {
            return (student.recid !== id)
          });
          console.log("The newarray delee student", newarray)
          this.setState({ studentrecords: newarray }, () => console.log("The studentrecords", this.state.studentrecords))
        }
      })
      .catch(error => {
        console.log("Error in deleting student details", error);
      });
  }

  updateStudentDetails = (studentrecord) => {
    console.log("Student Record", studentrecord);
    API.updateStudentDetails(studentrecord)
      .then(response => {
        if (response.statatus === 200) {
          console.log("The studentrecords", response);
          let updatedStudentrecord = [];
          for (let i = 0; i < this.state.studentrecords; i++) {
            if (this.state.studentrecords.recid !== studentrecord.recid) {
              updatedStudentrecord.push(this.state.studentrecords[i])
            }
            else {
              updatedStudentrecord.push(studentrecord);
            }
          }
          console.log("Student Details updated", this.state.studentrecords);
          // this.setState({ studentrecords: newarray }, () => console.log("The studentrecords", this.state.studentrecords))

        }

      })
      .catch(error => {
        console.log("Error in Updating student records", error);

      });
  }

  render() {
    const studentrecords = this.state.studentrecords;
    return (
      <div className="middlecontent">

        <br />
        <h3 className="subhead text-center">Student Records</h3>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Parent </th>
                <th>Phonenumber</th>
                <th>Level Completed</th>
                <th>Current Level</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              
              {studentrecords.map((data, index) =>
                <Allstudents key={index}
                  stdid={data._id}
                  stdlname={data.studentlname}
                  stdfname={data.studentfname}
                  parentname={data.parentname}
                  phonenumber={data.parentphonenumber}
                  stdemail={data.loginemail}
                  levelcompleted={data.levelcompleted}
                  levelrequested={data.levelrequested}
                  deleteStudentDetails={this.deleteStudentDetails}
                  updateStudentDetails={this.updateStudentDetails}
                />
              )}
            </tbody>
          </table>
          <div className="container">
            <h6 className="subhead text-center">Add a New Student</h6>
            <p className="errmsg">{this.state.errmsg}</p>
            <form className="inputsection d-flex flex-wrap">
              <div className="row">
                <div className="col-md-5"> 
                  <div className="form-group row">
                    <label className="has-float-label"
                      forhtml="studentfname">Firstname</label>
                    <input type="text"
                      value={this.state.studentfname}
                      onChange={this.handleInputChange}
                      className="form-control"
                      id="studentfname"
                      name="studentfname"
                      required
                      placeholder="Firstname" />
                  </div>
                  <div className="form-group row">
                    <label className="has-float-label">
                      Lastname</label>
                    <input type="text"
                      placeholder="Lastname"
                      className="form-control"
                      value={this.state.studentlname}
                      onChange={this.handleInputChange}
                      name="studentlname"
                      id="studentlname"
                      required />
                  </div>
                  <div className="form=group row">
                    <label className="has-float-label">
                      Parent</label>
                    <input type="text"
                      placeholder="Parent name"
                      value={this.state.parentname}
                      onChange={this.handleInputChange}
                      name="parentname"
                      className="form-control"
                      id="parentname"
                      required />
                  </div>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-5">
                  <div className="form-group row">
                    <label className="has-float-label">
                      Email</label>
                    <input type="email"
                      placeholder="Login Email"
                      value={this.state.loginemail}
                      onChange={this.handleInputChange}
                      name="loginemail"
                      id="loginemail"
                      className="form-control"
                      required />
                  </div>
                  <div className="form-group row">
                    <label className="has-float-label">
                      Password</label>
                    <input type="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      name="password"
                      id="password"
                      className="form-control"
                      required />
                  </div>
                  <div className="form-group row">
                    <label className="has-float-label">
                      Phonenumber</label>
                    <input type="text"
                      placeholder="Phone number"
                      className="form-control"
                      value={this.state.parentphonenumber}
                      onChange={this.handleInputChange}
                      name="parentphonenumber"
                      id="parentphonenumber"
                      required />
                  </div>
                </div>
              </div>
              {/* <div className="row">
                        <div className="col-md-9"> */}
              <button
                className="createbutton" name="creation" onClick={this.handleStudentCreation}>Create Student account</button>
              {/* </div>
                      </div> */}
            </form>
          </div>
        </div>

      </div>) //end return
  } // end render

} // end class 

export default Studentmanagement;

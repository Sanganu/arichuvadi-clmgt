import React, { Component } from 'react';
import axios from 'axios';
import Allstudents from './displayallstudentsdetails';
import Topmenu from "../components/Topmenu";
import Teacherheader from '../components/Teacherheader';

class Addstudent extends Component {
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
    let studentrecords = this.state.studentrecords;
    console.log("ComponentDidmount - Student management")
    axios.get("/api/teacher/students/all")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          let currentrec = {
            recid: response.data[i]._id,
            stdfname: response.data[i].studentfname,
            stdlname: response.data[i].studentlname,
            stdemail: response.data[i].loginemail,
            parentname: response.data[i].parentname,
            phonenumber: response.data[i].parentphonenumber,
            noofbatches: response.data[i].batchid.length
            // batchid: response.data[i].batchid._id,
            // batchdesc: response.data[i].batchid.batchdesc,
            // subject: response.data[i].batchid.subject
          }
          studentrecords.push(currentrec);
        } // end for
        this.setState({ studentrecords: studentrecords }, () => console.log("Student Management:", studentrecords))
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
      axios.post('/api/teacher/student/new',
        { newrecord })
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
    axios.delete("/api/teacher/student/delete/" + id)
      .then(response => {
        console.log("the response", response)
        if (response.status === 200) {
          const newarray = this.state.studentrecords.filter(function (student) {
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
    axios.put("/api/teacher/student/update/" + studentrecord.recid, studentrecord)
      .then(response => {
        if (response.statatus === 200) {
          // var newarray = this.state.studentrecords.filter(function (student) {
          //   return (student.recid !== studentrecord.id)
          // });
          // newarray.push(studentrecord);
          // console.log("The newarray-student update", newarray)
          // this.setState(
          //   { studentrecords: newarray },
          //   () => console.log("The studentrecords", this.state.studentrecords));
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
        }

      })
      .catch(error => {
        console.log("Error in Updating student records", error);

      });
  }

  render() {
    const studentrecords = this.state.studentrecords;
    return (
      <div>
        <Teacherheader />
        <div className="middlecontent">
        <h3 className="subhead">New Student</h3>
          <div className="row">
           
            <div className="col-lg-1 col-sm-1"> 
                <Topmenu />
            </div>
            <div className="col-sm-11 col-lg-11">
              <p className="errmsg">{this.state.errmsg}</p>
              <form className="inputsection">
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
                <button
                  className="createbutton" name="creation" onClick={this.handleStudentCreation}>Create Student account</button>
              </form>
            </div>
          </div>
          <br />
          <h6 className="tablehead">Student Records </h6>
          <div className="table-responsive">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Parent </th>
                  <th>Phonenumber</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {studentrecords.map((data, index) =>
                  <Allstudents key={index}
                    stdlname={data.stdlname}
                    stdid={data.recid}
                    stdfname={data.stdfname}
                    parentname={data.parentname}
                    phonenumber={data.phonenumber}
                    stdemail={data.stdemail}
                    subject={data.subject}
                    deleteStudentDetails={this.deleteStudentDetails}
                    updateStudentDetails={this.updateStudentDetails}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
    
      </div>
    ) //end return
  } // end render

} // end class 

export default Addstudent;

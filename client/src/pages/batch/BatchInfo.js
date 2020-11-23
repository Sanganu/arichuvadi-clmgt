import React, { Component } from 'react';

import Addstudent from '../student//Addstudent.js';
import BatchAddClassDetails from './Addclassdetails.js';
import Allstudents from '../student/displayallstudents.js';
import Allclasses from '../batch/displayallclassdetails.js';
// import Allbatches from './displayallbatchdetails.js';
// import StudentID from './StudentID.js';
import { connect } from 'react-redux';
import Homepage from '../general/Homepage.js';
import { ValidateEmail, ValidateName, CheckPassword, ValidatePhonenumber } from '../../util/Inputvalidations.js'
import API from "../../API/Board";
import BAPI from "../../API/Batch";
import MasterKey from "../../components/Masterkey";
import MAPI from "../../API/Multi";

class BatchInfo extends Component {
  state = {
    bid: this.props.batchdetails.bid || '',
    bdesc: this.props.batchdetails.batchdesc || '',
    instructor: this.props.batchdetails.instructor || '',
    level: this.props.batchdetails.level || '',
    course: this.props.batchdetails.course || '',
    students: this.props.batchdetails.students || '',
    bdescription: this.props.batchdetails.batchdesc || '',
    studentrecs: [],
    classrecs: [],
    delstdid: '',
    instructorList: []
  }


  deleteStudent = (stdid) => {
    //  console.log("Student to be deleted", stdid, this.state.bid);//his.props.batchdetails.bid);
    let studentrecs = 0;
    API.deleteStudentFromBatch(
      {
        batchid: this.state.bid,
        studentid: stdid
      })
      .then(response => {
        //        console.log("Student Details deleted from Batch", response);
        for (let i = 0; i < this.state.studentrecs.length; i++) {
          if (stdid !== this.state.studentrecs[i].stdid) {
            studentrecs.push(this.state.studentrecs[i]);
          }
        }
        this.setState({ studentrecs }, () => {
          console.log("The Updated State of studentrecs", this.state.studentrecs);
        });
      }) //end then
      .catch(error => {
        console.log("Error in deleting batch student class records!!!", error);
      }); // end catch
  } //end of delete student

  updateBatch = (event) => {
    event.preventDefault();
    //console.log("Batch Update:",this.state.bid,this.state.bdesc,this.state.rate,this.state.level,this.state.subject,this.state.students);
    if (this.batchInputValidation()) {
      API.addNewStudentsToBatch(
        {
          batchid: this.state.bid,
          batchdesc: this.state.bdesc,
          course: this.state.course,
          level: this.state.level,
          teacher: this.state.instructor
        })
        .then((response) => {
          //      console.log("The response from update" + response);
          this.setState({ bdescription: this.state.bdesc }, () => {
            console.log("The set state", this.state.bdescription);
          });
        })
        .catch(error => {
          this.setState({ errmsg: "Error in saving class records" + error, updatestatus: 'Error in updating class details' + error },
            () => {
              console.log("Error in saving class records!!!", error);
            });
        }); // end catch
    }
    else {
      console.log("Invalid Batch DEscription")
    }
  } // end of update batch

  //Batch delete
  deleteBatch = (event) => {
    event.preventDefault();
    console.log("batch id", this.state.bid)
    BAPI.deleteBatch(this.state.bid)
      .then((response) => {
        console.log("Batch deleted", response);
        this.props.deleteBatch(this.state.bid);
      })
      .catch(error => {
        console.log("Error in deleting Batch records: ", error);

      })
  } //End of delete batch

  studentInputValidation = () => {
    if (!ValidatePhonenumber()) {

    }
    else if (!ValidateEmail()) {

    }
    else if (!CheckPassword()) {

    }
  }

  batchInputValidation = () => {
    if (!ValidateName(this.state.batchdesc)) {
      return false;
    }
    else {
      return true;
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  } //End handle Input change

  handleNewStudent = (nstudent) => {
    console.log("The student records", nstudent);
    let studentrecs = this.state.studentrecs;
    let newstrec = {
      stdid: nstudent.stdid,
    }
  }
  handleClassDetails = (nclass) => {
    let classrecs = this.state.classrecs;
    console.log("The class details", nclass);
    classrecs.push(nclass);
    this.setState({ classrecs }, () => { console.log("Class details", classrecs) });
  }
  getInstructor = (value) => {
    this.setState({
      instructor: value
    })
    console.log("Instructor", value)
  }
  getStudent = (student) => {
    let studentrecs = this.state.studentrecs
    studentrecs.push(student)
    this.setState({
      studentrecs: studentrecs
    })
  }
  componentDidMount = () => {
    let bid = this.props.batchdetails.bid;
    let strecs = this.state.studentrecs || [];
    let clrecs = this.state.classrecs || [];
    // MAPI.getAllInstructors()
    //   .then((records) => {
    //     console.log("Rec", records.data)
    //     this.setState({ instructorList: records.data })
    //   })
    // console.log("The batch selected details received",this.props)
    // if (this.props.newbatch === false || this.props.student.length >0) {

    BAPI.getBatchDetail(bid)
      .then((records) => {
        console.log("Batch Info Component did mount", records)
        let batchdetails = records.data
        this.setState({ instructor: batchdetails[1].fname + " " + batchdetails[1].lname })
        // console.log("BatchInfo",batchdetails[0].classid)
        if (batchdetails[0].classid.length > 0) {

          this.setState({ classrecs: batchdetails[0].classid })
          console.log("Hello", this.state.classrecs)
        }
        console.log("BatchInfo", batchdetails[0].students)
        if (batchdetails[0].students.length > 0) {

          this.setState({ studentrecs: batchdetails[0].students })
          console.log("Hello", this.state.studentrecs)
        }
      })

  } // End ()

  render() {
    const studentrec = this.state.studentrecs;
    if (this.props.usertype === "management") {
      return (<div className="middlecontent">
        <div className="row d-flex flex-wrap">
          <div className="col-lg-11 col-md-11 col-sm-12 border border-info rounded">
            <h4>{this.state.instructor}'s {this.state.bdesc} Cohort</h4>
            <form className="inputsection">
              <div className="form-group row">

                <label className="has-float-label"
                  htmlFor="bdesc">
                  Batch Name </label>
                <input value={this.state.bdesc}
                  placeholder={this.state.bdesc}
                  name="bdesc"
                  id="bdesc"
                  onChange={this.handleInputChange}
                  className="form-control"
                />

              </div>
              <div className="form-group row">
                <label className="has-float-label">Instructor </label>

                <input
                  placeholder={this.state.instructor}
                  name="instructor"
                  readOnly
                  className="form-control"
                />



              </div>
              <div className="form-group row">
                <label className="has-float-label">Course : </label>
                <select className="form-control droplist"
                  onChange={this.handleInputChange}
                  value={this.state.course} name="course" id="course">
                  <option value='Beginner' default>Beginner</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Advance'>Advance</option>
                </select>
              </div>
              <div className="form-group row">
                <label className="has-float-label">Level </label>
                <select className="form-control droplist" value={this.state.level} onChange={this.handleInputChange} name="level" id="level">
                  <option value='Oral' default>Oral Examination</option>
                  <option value='Visual'>Visual Examination</option>
                  <option value='Written'>Written Examination</option>
                  <option value='Online'>Online Examination</option>
                  <option value='Offline'>Offline Examination</option>
                </select>
              </div>
              <div className="card">
              <button onClick={this.updateBatch} className="rowbtn m-1 p-1"><i className="fa fa-edit fa-lg"></i>Update</button>
              <button onClick={this.deleteBatch} className="rowbtn m-1 p-1"><i className="fa fa-trash fa-lg"></i>Delete</button>
              {/* <button onClick={}>Change Instructor</buttonn>
              <button onClick={}>Add Class notes</button>
              <button onClick={}>Add Students to this batch</button> */}
              </div>
            </form>
          </div>
        </div>

        <div className="row" >
          <div className="col-md-6">
            <div className="table-responsive">
              <h6>Students in this Cohort</h6>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    {/* <th>Phone</th> */}
                  </tr>
                </thead>
                <tbody>

                  {studentrec.map((data, index) => (
                    <Allstudents studentrec={data}
                      deleteStudentDetails={this.deleteStudent}
                      key={index}
                    />))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="table-responsive">
            <h6>Class Notes - sessions covered</h6>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Lessons Covered</th>
                    <th>Homework</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <Allclasses
                  classrecs={this.state.classrecs} />
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-11 col-sm-12">
            <h6>Add New Student</h6>
            <MasterKey
              IdType="student"
              passStudentId={this.getStudent} />

            {/* <Addstu     dent batchdet={this.props.batchdetails}
              newStudent={this.handleNewStudent} /> */}
            {/* <StudentID /> */}
          </div>
          <div className="col-lg-4 col-md-11 col-sm-12">
            <h6>Add Class Details</h6>
            <BatchAddClassDetails batchdet={this.props.batchdetails}
              newClassDetails={this.handleClassDetails} />
          </div>
        </div>
      </div>)
    }
    else {
      return <Homepage msg="Please Login" />
    }
  } // end of render
} //end component

const mapStateToProps = (state) => {
  console.log("Map State to Props : ", state);
  return {
    loginemail: state.loginemail,
    userfname: state.userfname,
    userlname: state.userlname,
    usertype: state.usertype,
    userid: state.userid
  }
}

//export default BatchInfo;
export default connect(mapStateToProps)(BatchInfo);


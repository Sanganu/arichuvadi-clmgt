import React, { Component } from 'react';
// import Addstudent from '../student//Addstudent.js';
import BatchAddClassDetails from './Addclassdetails.js';
import Allstudents from '../student/displayallstudents.js';
import Allclasses from '../batch/displayallclassdetails.js';
// import Allbatches from './displayallbatchdetails.js';
// import StudentID from './StudentID.js';
import { connect } from 'react-redux';
import Homepage from '../general/Homepage.js';
import { ValidateEmail, ValidateName, CheckPassword, ValidatePhonenumber } from '../../util/Inputvalidations.js'
// import API from "../../API/Board";
import BAPI from "../../API/Batch";
import MasterKey from "../../components/Masterkey";
// import MAPI from "../../API/Multi";
import Modal from "../general/Modal";
import SAPI from "../../API/Student";
import { Form, Button, Accordion,Card } from "react-bootstrap";

class BatchClassActivity extends Component {
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



 
  

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  } //End handle Input change

 
  handleClassDetails = (nclass) => {
    let classrecs = this.state.classrecs;
    console.log("The class details", nclass);
    classrecs.push(nclass);
    this.setState({ classrecs }, () => { console.log("Class details", classrecs) });
  } // End handleClassDetails

  getInstructor = (value) => {
    this.setState({
      instructor: value
    })
    console.log("Instructor", value)
  } // End getInstructor

  getStudent = (student) => {
    let studentrecs = this.state.studentrecs
    studentrecs.push(student)
    console.log(student)
    this.setState({
      studentrecs: studentrecs
    })
  } //End getStudent()

  componentDidMount = () => {


    // MAPI.getAllInstructors()
    //   .then((records) => {
    //     console.log("Rec", records.data)
    //     this.setState({ instructorList: records.data })
    //   })
    // console.log("The batch selected details received",this.props)
    // if (this.props.newbatch === false || this.props.student.length >0) {

    this.getUpdatedBatchDetails()

  } // End componentDidMount()

 
  render() {
    const studentrec = this.state.studentrecs;
    if (this.props.usertype === "management") {
      return (<div className="middlecontent">
        <div className="row d-flex flex-wrap">
          <div className="col-lg-9 col-md-12 col-sm-12 border border-info rounded">
            <h4>{this.state.instructor}'s {this.state.bdesc} Cohort</h4>
            <Form className="inputsection">
              <Form.Group controlId="formBasicText">

                <label className="has-float-label"
                  htmlFor="bdesc">
                  Batch Name </label>
                <input value={this.state.bdesc}
                  placeholder={this.state.bdesc}
                  name="bdesc"
                  id="bdesc"
                  readonly
                  className="form-control"
                />

              </Form.Group>
              <Form.Group controlId="formBasicText">
                <label className="has-float-label">Instructor </label>

                <input
                  placeholder={this.state.instructor}
                  name="instructor"
                  readOnly
                  className="form-control"
                />

              </Form.Group>
              <Form.Group controlId="formBasicDropList">
                <label className="has-float-label">Course : </label>
                <select className="form-control droplist"
                  onChange={this.handleInputChange}
                  value={this.state.course} name="course" id="course">
                  <option value='Beginner' default>Beginner</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Advance'>Advance</option>
                </select>
              </Form.Group>
              <Form.Group controlId="formBasicDropList">
                <label className="has-float-label">Level </label>
                <select className="form-control droplist" value={this.state.level} onChange={this.handleInputChange} name="level" id="level">
                  <option value='Oral' default>Oral Examination</option>
                  <option value='Visual'>Visual Examination</option>
                  <option value='Written'>Written Examination</option>
                  <option value='Online'>Online Examination</option>
                  <option value='Offline'>Offline Examination</option>
                </select>
              </Form.Group>
              <div className="card">
                <button onClick={this.updateBatch} className="rowbtn"><i className="fa fa-edit fa-lg"></i>Update</button>
              </div>
            </Form>
          </div>
          <div class="col-md-3">
            {studentrec.map((data, index) => (<Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {data.studentname}
                   </Accordion.Toggle>
                  </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
                      ))}
          </div>
        </div>

        <div className="row  border border-danger" >
          <div className="col-md-8">
            <div className="table-responsive">
              <h4>Add comments for students</h4>
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

        </div>

        <div className="row border border-danger">
          <div className="col-lg-8 col-md-12">
            <div className="table-responsive">
              <h4>Class Notes - sessions covered</h4>
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

          <div className="col-lg-4 col-md-12 col-sm-12">
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
export default connect(mapStateToProps)(BatchClassActivity);


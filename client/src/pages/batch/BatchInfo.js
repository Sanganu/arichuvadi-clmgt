import React, { Component } from 'react';
import BatchAddClassDetails from './Addclassdetails.js';
import Allclasses from '../batch//Displayallclassdetails.js';
import { connect } from 'react-redux';
import BAPI from "../../API/Batch";
import Modal from "../general/Modal";
import SAPI from "../../API/Student";
import { Form, Table, Container, Row, Col } from "react-bootstrap";
import Buttons from "../../components/Buttons";
import moment from "moment";

// import Addstudent from '../student//Addstudent.js';
// import Allstudents from '../general/displayrecords';
// import Allbatches from './DisplayallbatchDetails.js'; 
// import StudentID from './StudentID.js';
// import { ValidateEmail, ValidateName, CheckPassword, ValidatePhonenumber } from '../../util/Inputvalidations.js'
// import API from "../../API/Board";
// import MasterKey from "../../components/Masterkey";  
// import MAPI from "../../API/Multi";



class BatchInfo extends Component {
  state = {
    bid: this.props.batchDetails?.bid || '',
    bdesc: this.props.batchDetails?.batchdesc || '',
    instructorID: this.props.batchDetails?.teacher_id ||"",
    instructor: this.props.batchDetails?.teacher || '',
    level: this.props.batchDetails?.level || '',
    course: this.props.batchDetails?.course || '',
    examdate: this.props.batchDetails?.examDate
      ? moment(this.props.batchDetails.examDate).format('YYYY-MM-DD')
      : '',
    students: '',
    studentrecs: [],
    classrecs: [],
    delstdid: '',
    instructorList: []
  }// End of State

    handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  } //End handle Input change

  componentDidMount = () => {
    this.getUpdatedbatchDetails()
  } // End componentDidMount()


  getUpdatedbatchDetails = () => {
    console.log("=====Updated Batch Details======")
    const bid = this.state.bid;
    if (!bid) return;

    BAPI.getBatchDetail(bid)
      .then((records) => {
        console.log(`batch details ${records.data}`)
        const batch = records[0]
       
        const instructorRec = records.data[0].teacher;
        if (!batch) {
          this.setState({ errmsg: "Batch not found" });
          return;
        }
        console.log("Batch Info Component did mount", records.data)
        // this.setState(
        //   {
        //     instructor: batchDetails[0].teacher.fullName,
        //     instructorID: batchDetails[0].teacher._id
        //   })

        this.setState({
          instructor: instructorRec ? `${instructorRec.fullName}`.trim() : "Not Assigned",
          instructorID: instructorRec._id,
          classrecs: Array.isArray(batch.classid) ? batch.classid : [],
          studenrecs: Array.isArray(batch.students) ? batch.students : []
        }).catch((err) => {
          console.error(`Error in fetching batch details in BatchInfo component -----: ${err}`)
          this.setState({
            errmsg: "Unable to load batch details"
          });
        })
      });
  }
  // console.log("BatchInfo",batchDetails[0].classid)
  // if (batchDetails[0].classid.length > 0) {

  //   this.setState({ classrecs: batchDetails[0].classid })
  //   console.log("Hello Class Records", this.state.classrecs)
  // }
  // // console.log("BatchInfo", batchDetails[0].students)
  // if (batchDetails[0].students.length > 0) {

  //   this.setState({ studentrecs: batchDetails[0].students })
  //   console.log("Hello Student Records", this.state.studentrecs)
  // }


  deleteStudent = (stdid) => {
    console.log("Student to be deleted", stdid, this.state.bid);

    let studentrecs = 0;
    BAPI.deleteStudentFromBatch(
      {
        batchid: this.state.bid,
        studentid: stdid
      })
      .then(response => {
        //        console.log("Student Details deleted from Batch", response);
        studentrecs = this.state.studentrecs.filtere(student => (stdid !== student.stdid))
        this.setState({ studentrecs }, () => {
          console.log("The Updated State of studentrecs", this.state.studentrecs);
        });
      }) //end then
      .catch(error => {
        console.log("Error in deleting batch student class records!!!", error);
      }); // end catch
  } //end of delete student

  updateBatch = (event) => {
    if(event && event.preventDefault()) event.preventDefault();
    //console.log("Batch Update:",this.state.bid,this.state.bdesc,this.state.level,this.state.subject,this.state.students);
    // if (this.batchInputValidation()) {
    BAPI.updateBatch(
      {
        batchid: this.state.bid,
        batchdesc: this.state.bdesc,
        course: this.state.course,
        level: this.state.level,
        teacher: this.state.instructorID,
        examDate: this.state.examdate
      })
      .then((response) => {
        console.log("The response from update" + response);
        // this.setState({ bdesc: this.state.bdesc }, () => {
        //   console.log("The set state", this.state.bdescription);
        // });
      })
      .catch(error => {
        this.setState({ errmsg: "Error in saving class records" + error, updatestatus: 'Error in updating class details' + error },
          () => {
            console.log("Error in saving class records!!!", error);
          });
      }); // end catch
  } // end of update batch

  //Batch delete
  deleteBatch = (event) => {
    event.preventDefault();
    console.log("Delete  batch id", this.state.bid)
    BAPI.deleteBatch(this.state.bid)
      .then((response) => {
        console.log("Batch deleted", response);
        this.props.deleteBatch(this.state.bid);
      })
      .catch(error => {
        console.log("Error in deleting Batch records: ", error);

      })
  } //End of delete batch




  handleNewStudent = (nstudent, stdname) => {
    console.log("The student records", nstudent);
    SAPI.addStudentToBatch({
      batchid: this.state.bid,
      studentid: nstudent
    }).then(result => {
      console.log("Student List", result);
      this.getUpdatedbatchDetails()
    })
  } // End handelNew Student()

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
    console.log("Instructor", value);
    this.updateBatch()
    this.getUpdatedbatchDetails()
  } // End getInstructor






  handleChangeInstructor = (instructorIdn) => {
    console.log(instructorIdn)
    this.setState({
      instructorID: instructorIdn
    }, () => {
      console.log(instructorIdn, this.state.instructorID, this.state.instructor)

    })
  }


  render() {
    const studentrec = this.state.studentrecs;
    console.log(this.props,"++++++++")
    //if (this.props.usertype === "management ") {
      return (<Container>
        <Row className="m-2 p-2">
          <Col>
            <h4 className="text-center">{this.state.instructor}'s {this.state.bdesc} Cohort</h4>
            <Form className="inputsection">
              <Form.Group controlId="formBasicText">
                <label className="has-float-label">Instructor </label>

                <h6 name="instructor"
                  className="form-control">{this.state.instructor}</h6>

              </Form.Group>
              <Form.Group controlId="formBasicText">

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
                <Form.Group>
                  <Form.Label>Exam Date   </Form.Label>
                  <Form.Control
                    id="examdate"
                    type="date"
                    value={this.state.examdate}
                    placeholder={this.state.examdate}
                    onChange={this.handleInputChange}
                    name="examdate" />
                </Form.Group>
              </Form.Group>
              <Row className="m-2 p-2">
                <Col>
                  <Buttons
                    onButton={this.updateBatch}><i className="fa fa-edit fa-lg"></i>Update</Buttons>
                </Col>
                <Col>
                  <Buttons onButton={this.deleteBatch}><i className="fa fa-trash fa-lg"></i>Delete</Buttons>
                </Col>
              </Row>
              <Row className="m-5 p-5">
                <Modal
                  Title="Change Instructor"
                  IdType="instructor"
                  Id={this.state.instructorID}
                  Value={this.state.instructor}
                  passIdToMaster={this.handleChangeInstructor} />

                <Modal
                  Title="Add Registered students to this Cohort"
                  IdType="students"
                  passIdToMaster={this.handleNewStudent} />

                {/* <Button onClick={}>Change Instructor</Button>
                                          <Button onClick={}>Add Class notes</Button>
      <Button onClick={}>Add Students to this batch</Button>*/}

              </Row>

            </Form>
          </Col>
        </Row>
        <Row className="m-2 p-2">
          <Col lg={true} sm={12}>
            <div className="table-responsive">

              <h4 className="text-center">Students in this Cohort</h4>
              <Table responsive striped bordered hover variant="dark" >
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    {/* <th>Username</th> */}
                    {/* <th>Phone</th> */}
                  </tr>
                </thead>
                <tbody className="text-white">

                  {studentrec.map((data, index) => (
                    <tr key={index}>
                      <td>{data.studentfname}</td>
                      <td>{data.studentlname}</td>
                    </tr>))}
                </tbody>
              </Table>


            </div>
          </Col>

        </Row>


        <Row className="m-2 p-2">
          <Col>
            <div className="table-responsive">
              <h4 className="text-center">Class Notes</h4>
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
          </Col>

          <Col>
            <h5>Add Class Details</h5>
            <BatchAddClassDetails batchdet={this.props.batchDetails}
              newClassDetails={this.handleClassDetails} />
          </Col>
        </Row>
      </Container>
      ) // End Return
   // } // End if
    // else {
    //   console.log("-------------------BATCH INFO---------------------------------------------------------")
    //   return <Homepage msg="Please Login" />
    // }
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


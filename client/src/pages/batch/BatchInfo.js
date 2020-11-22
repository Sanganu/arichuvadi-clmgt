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
import MasterKey  from "../../components/Masterkey";
import  MAPI from "../../API/Multi";

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
    instructorList:[]
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
  getInstructor =(value) =>{
    this.setState({
        instructor:value
    })
    console.log("Instructor",value)
}
  getStudent = (student) => {
     let studentrecs = this.state.studentrecs
     studentrecs.push(student)
     this.setState({
       studentrecs:studentrecs
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
      console.log("Batch Info Component did mount")
      BAPI.getBatchDetail(bid)
      .then((records) => {
        console.log("BatchInfo",records)
      })
      // BAPI.getClassDetails(bid)
      //   .then(response => {
      //     // console.log("The Existing Students & Class",response.data);
      //     // console.log("The Student records length",response.data.srecords.length);
      //     // console.log("The class records length",response.data.crecords.length);
      //     if (response.data.srecords.length > 0) {
      //       for (let i = 0; i < response.data.srecords.length; i++) {
      //         //console.log(response.data.srecords[i]);
      //         let newstrec = {
      //           stdid: response.data.srecords[i]._id,
      //           stdfname: response.data.srecords[i].studentfname,
      //           stdlname: response.data.srecords[i].studentlname,
      //           stdemail: response.data.srecords[i].loginemail,
      //           phonenumber: response.data.srecords[i].parentphonenumber
      //         } // end rec
      //         strecs.push(newstrec);
      //       } // end for loop
      //       // console.log("The student recs",strecs);  
      //     };// end if srecords part

      //     if (response.data.crecords.length > 0) {
      //       for (let i = 0; i < response.data.crecords.length; i++) {
      //         let newclrec = {
      //           lessoncov: response.data.crecords[i].lessoncovered,
      //           homework: response.data.crecords[i].homework,
      //           cldate: response.data.crecords[i].classdate,
      //           clid: response.data.crecords[i]._id
      //         }
      //         clrecs.push(newclrec);
      //       } // end for loop
      //     }
      //     // end if crecords part         
        //   this.setState({
        //     studentrecs: strecs,
        //     classrecs: clrecs
        //   }, () => {
        //     console.log("Set State:", this.state.studentrecs, this.state.classrecs);
        //   }); // End Set state 
        // }) // end then part
        // .catch(error => {
        //   console.log("The Error Encountered in fetching exiting students and class details", error);
        // }); // End Axios
    //} // End /if part
  } // End ()

  render() {
    const studentrec = this.state.studentrecs;
    if (this.props.usertype === "management") {
      return (<div className="middlecontent">
        <div className="row">
          <div className="col-lg-4 col-md-11 col-sm-12">
            <h4>Cohort Details</h4>
            <form className="inputsection">
              <div className="form-group">

                <label className="form-control-placeholder"
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

                  <label>{this.state.instructor}</label>
                {/* // <MasterKey items={this.state.i}
                //   passMasterId={this.getInstructor}
                //   Id={this.state.instructor} /> */}

              

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
              <button onClick={this.updateBatch} className="rowbtn"><i className="fa fa-edit fa-lg"></i>Update</button>
              <button onClick={this.deleteBatch} className="rowbtn"><i className="fa fa-trash fa-lg"></i>Delete</button>
            </form>
          </div>
          <div className="col-lg-4 col-md-11 col-sm-12">
            <h6>Add New Student</h6>
            <MasterKey
                IdType="student"
                passStudentId ={this.getStudent} />

            {/* <Addstudent batchdet={this.props.batchdetails}
              newStudent={this.handleNewStudent} /> */}
            {/* <StudentID /> */}
          </div>
          <div className="col-lg-4 col-md-11 col-sm-12">
            <h6>Add Class Details</h6>
            <BatchAddClassDetails batchdet={this.props.batchdetails}
              newClassDetails={this.handleClassDetails} />
          </div>
        </div>
        <div className="row" >
          <div className="col-md-6">
            <div className="table-responsive">
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


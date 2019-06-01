import React, { Component } from 'react';
import axios from 'axios';
import Addstudent from './Addstudent.js';
import BatchAddClassDetails from './Addclassdetails.js';
import Allstudents from './displayallstudents.js';
import Allclasses from './displayallclassdetails.js';
import Allbatches from './displayallbatchdetails.js';

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
    delstdid: ''
  }


  deleteStudent = (stdid) => {
  //  console.log("Student to be deleted", stdid, this.state.bid);//his.props.batchdetails.bid);
    let studentrecs = 0;
    axios.put('/api/batch/student/delete/',
      {
        batchid: this.state.bid,
        studentid: stdid
      })
      .then(response => {
//        console.log("Student Details deleted from Batch", response);
        for(let i =0;i < this.state.studentrecs.length;i++)
        {
          if(stdid !== this.state.studentrecs[i].stdid)
          {
            studentrecs.push(this.state.studentrecs[i]);
          }
        }
        this.setState({studentrecs},() => {
           console.log("The Updated State of studentrecs",this.state.studentrecs);
        });
      }) //end then
      .catch(error => {
        console.log("Error in deleting batch student class records!!!", error);
      }); // end catch
  } //end of delete student

      updateBatch = (event) => {
            event.preventDefault();
            //console.log("Batch Update:",this.state.bid,this.state.bdesc,this.state.rate,this.state.level,this.state.subject,this.state.students);
            axios.put('/api/teacher/batch/update',
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
      } // end of update batch

  //Batch delete
  deleteBatch = (event) =>{
            event.preventDefault();
            axios.delete("/api/teacher/batch/delete",{
              batchid : this.state.bid
            }).then((response) => {
              console.log("Batch deleted", response);
              return <Allbatches displayall={true}/>
            })
            .catch(error =>{
              console.log("Error in deleting Batch records: ",error);
              
            })
  } //End of delete batch

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
      stdfname: nstudent.stdfname,
      stdlname: nstudent.stdlname,
      stdemail: nstudent.stdemail,
      phonenumber: nstudent.phonenumber
    }
    if (newstrec) {
      studentrecs.push(newstrec);
      this.setState({
        studentrecs: studentrecs
      }, () => { console.log("The Student Records - update with add student", studentrecs); });
    }

  }

  handleClassDetails = (nclass) => {
    let classrecs = this.state.classrecs;
    console.log("The class details", nclass);
    classrecs.push(nclass);
    this.setState({ classrecs }, () => { console.log("Class details", classrecs) });
  }

  componentDidMount = () => {
    let bid = this.props.batchdetails.bid;
    let strecs = this.state.studentrecs || [];
    let clrecs = this.state.classrecs || [];
    //console.log("The batch selected details received",this.props)
    if (this.props.newbatch === false) {
      axios.get('/api/teacher/batch/student/class/details/' + bid)
        .then(response => {
          // console.log("The Existing Students & Class",response.data);
          // console.log("The Student records length",response.data.srecords.length);
          // console.log("The class records length",response.data.crecords.length);
          if (response.data.srecords.length > 0) {
            for (let i = 0; i < response.data.srecords.length; i++) {
              //console.log(response.data.srecords[i]);
              let newstrec = {
                stdid: response.data.srecords[i]._id,
                stdfname: response.data.srecords[i].studentfname,
                stdlname: response.data.srecords[i].studentlname,
                stdemail: response.data.srecords[i].loginemail,
                phonenumber: response.data.srecords[i].parentphonenumber
              } // end rec
              strecs.push(newstrec);
            } // end for loop
            // console.log("The student recs",strecs);  
          };// end if srecords part

          if (response.data.crecords.length > 0) {
            for (let i = 0; i < response.data.crecords.length; i++) {
              let newclrec = {
                lessoncov: response.data.crecords[i].lessoncovered,
                homework: response.data.crecords[i].homework,
                cldate: response.data.crecords[i].classdate,
                clid: response.data.crecords[i]._id
              }
              clrecs.push(newclrec);
            } // end for loop
          }
          // end if crecords part         
          this.setState({
            studentrecs: strecs,
            classrecs: clrecs
          }, () => {
            console.log("Set State:", this.state.studentrecs, this.state.classrecs);
          }); // End Set state 
        }) // end then part
        .catch(error => {
          console.log("The Error Encountered in fetching exiting students and class details", error);
        }); // End Axios
    } // End if part
  } // End ()

  render() {
    const studentrec = this.state.studentrecs;
    return (<div className="middlecontent"> 
      <div className="row">
        <div className="col-lg-4 col-md-11 col-sm-12">
          <h6>Cohort Details</h6>
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
            <div className="form-group">
              <label className="form-control-placeholder">
                Instructor </label>
              <input value={this.state.instructor}
                placeholder={this.state.instructor}
                name="instructor"
                id="instructor"
                className="form-control"
                onChange={this.handleInputChange} />
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
            {/* <button onClick={this.deleteBatch} className="rowbtn"><i className="fa fa-trash fa-lg"></i>Delete</button> */}
          </form>
        </div>
        <div className="col-lg-4 col-md-11 col-sm-12">
        <h6>Add New Student</h6>
          <Addstudent batchdet={this.props.batchdetails}
            newStudent={this.handleNewStudent} />
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
                  <th>Phone</th>
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
  } // end of render
} //end component

export default BatchInfo;


import React, { Component } from 'react';
import API from '../../API/Batch';
import BatchRecord from './Getbatchdetails';
import BatchInfo from './BatchInfo';
import { connect } from 'react-redux';
import moment from "moment";


class Allbatches extends Component {
  state = {
    batchrecords: [],
    diplayclass: false,
    recid: '',
    recdesc: '',
    recsubj: '',
    reclevel: '',
    recrate: '',
    allbatches: this.props.displayall || this.props.location?.displayall || true,
    sbatchid: '',
    sbdesc: '',
    srate: '',
    slevel: '',
    sbsubj: '',
    student: '',
    details: this.props.details || false,
    loginemail: '',
    username: '',
    batchSelected: false,
    batchdet: {
      bid: '',
      batchdesc: '',
      teacher: '',
      teacher_id: '',
      level: '',
      course: '',
      examDate: ''

    }
  }

  componentDidMount = () => {
    console.log("displayallbatchdetails -- component before axios call", this.props);
    this.loadBatches();
  } // end component did mount

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.location?.key !== this.props.location?.key &&
      this.props.match?.params?.displayall === "alltrue"
    ) {
      this.showAllBatches();
    }
  }



  loadBatches = () => {
    // if (this.props.usertype !== "management") {
    //   console.log("Console error", this.props.usertype, "----------------------------")
    //   return; //(<Homepage msg="Please Login" />);
    // }

    API.getAllBatch()
      .then(response => {
        //console.log("The Batch Details of  - axios call", response.data);
        let batchrecords = [];
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            const rec = response.data[i]
            const teacherDoc = rec.teacher;
            const teacherName =
              teacherDoc && typeof teacherDoc === "object"
                ? `${teacherDoc.fname || ""} ${teacherDoc.lname || ""}`.trim()
                : rec.teacherName || "Not Assigned";
            // console.log("Records", response.data[i]._id, response.data[i].batchdesc, response.data[i].level, response.data[i].teacher);
            let currentrec = {
              recid: rec._id,
              recdesc: rec.batchdesc,
              recsubj: rec.course,
              reclevel: rec.level,
              teacher: teacherName,
              teacher_id:
                teacherDoc && typeof teacherDoc === "object" && teacherDoc._id
                  ? String(teacherDoc._id)
                  : "", 
              noofstu: rec.students?.length,
              noofclasses: rec.classid?.length,
              examDate: rec.examDate ? moment(rec.examDate).format("MM-DD-YYYY") : ""
              //recstudents: response.data[i].students
            }
            batchrecords.push(currentrec);
          } // end for

          this.setState({
            batchrecords: batchrecords,
            allbatches: true
          })
          console.log("Batch list", batchrecords)
          // ,() => { console.log("State of records") });
        } else {
          this.setState({
            batchrecords: [],
            allbatches: false
          });
          console.log("Axios reponse -No Cohorts exist");
        }
      }) // end then
      .catch(error => {
        this.setState({ allbatches: false })
        console.log("Error in getting batch records!!!", error);
        // return (<Homepage msg="Please Login" />);
      });


  }

  showAllBatches = () => {
    this.setState({
      details: false,
      allbatches: true,
      batchSelected: false
    });
    this.loadBatches();
  }

  getBatchDetails = (batchselected) => {
    //let bid = batchselected.bid;      
    console.log("SELECTED BATCH---------------------", batchselected)
    this.setState({
      batchdet: batchselected,
      details: true,
      allbatches: false,
      batchSelected: true
    }, () => console.log("selected bxz cvc nbmatch",
      this.state.batchdet));
  }

  deleteBatch = (batchid) => {
    if(!batchid)return;
    console.log("delete", batchid)
    API.deleteBatch(batchid)
      .then(response => {
        let batchrecords = this.state.batchrecords.filter(batch => {
          return batch.recid !== batchid
        });
        this.setState({
          batchrecords: batchrecords,
          allbatches: batchrecords.length > 0,
          batchSelected: false,
          batchdet: {
            bid: '',
            batchdesc: '',
            teacher: '',
            teacher_id: '',
            level: '',
            course: '',
            examDate: ''
          }
        });
      })
  }


  render() {
    const stbatchrec = this.state.batchrecords;
    // console.log("Display all batch details --",this.props);
    //if (this.props.usertype === "management") {
      return (<div className="container">
        <div className="middlecontent">
          {this.state.batchSelected ? (
            <BatchInfo
              batchdetails={this.state.batchdet}
              newbatch={false}
              deleteBatch={this.deleteBatch}
            />
          ) : stbatchrec.length > 0 ?
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Course</th>
                  <th>Level</th>
                  <th>Exam Date</th>
                  <th>Number of Students</th>
                  <th>Number of classes</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>{stbatchrec.map((data, index) =>
                <BatchRecord
                  bid={data.recid}
                  bdesc={data.recdesc}
                  bsubj={data.recsubj}
                  blevel={data.reclevel}
                  teacher={data.teacher}
                  teacher_id={data.teacher_id}
                  students={data.noofstu}
                  classes={data.noofclasses}
                  examDate={data.examDate}
                  getBatchDetails={this.getBatchDetails}
                  deleteBatch={this.deleteBatch}
                  key={index}
                />
              )}
              </tbody>
            </table>
            : <>
              <h4>No cohorts exist</h4>
            </>
          }
        </div>
      </div> //End container
      ); // end return
    }// end if props.usertype is boardmember
    //else {
    //  return (<Homepage msg="Please Login as Board member to see all batches" />);
    //}
  } //end render
//} //end allbatches


const mapStateToProps = (state) => {
  // console.log("Map State to Props Display all batches: ", state);
  return {
    loginemail: state.loginemail,
    userfname: state.userfname,
    userlname: state.userlname,
    usertype: state.usertype,
    userid: state.userid
  }

}
export default connect(mapStateToProps)(Allbatches);

// export default Allbatches;




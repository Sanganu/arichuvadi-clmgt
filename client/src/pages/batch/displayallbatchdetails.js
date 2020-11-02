import React, { Component } from 'react';
import axios from 'axios';
import BatchRecord from './Getbatchdetails';
import BatchInfo from './BatchInfo';
import Homepage from "./Homepage";
import { connect } from 'react-redux';

class Allbatches extends Component {
  state = {
    batchrecords: [],
    diplayclass: false,
    recid: '',
    recdesc: '',
    recsubj: '',
    reclevel: '',
    recrate: '',
    allbatches: this.props.displayall || true,
    sbatchid: '',
    sbdesc: '',
    srate: '',
    slevel: '',
    sbsubj: '',
    student: '',
    details: this.props.details || false,
    loginemail: '',
    username: ''
  }

  componentDidMount = () => {
    //  console.log("displayallbatchdetails -- component before axios call",this.props);
    let batchrecords = this.state.batchrecords;
    let allbatches = false
    axios.get('/api/teacher/batch/all')
      .then(response => {
        console.log("The Batch Details of  - axios call", response.data);
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            // console.log("Records", response.data[i]._id, response.data[i].batchdesc, response.data[i].level, response.data[i].teacher);
            let currentrec = {
              recid: response.data[i]._id,
              recdesc: response.data[i].batchdesc,
              recsubj: response.data[i].course,
              reclevel: response.data[i].level,
              teacher: response.data[i].teacher,
              noofstu: response.data[i].students.length,
              noofclasses: response.data[i].classid.length
              //recstudents: response.data[i].students
            }
            batchrecords.push(currentrec);
          } // end for

          console.log("Axios No records exist");
          allbatches = true;
          this.setState({
            batchrecords: batchrecords,
            allbatches: allbatches
          },
            () => { console.log("State of records") });
        }
      }) // end then
      .catch(error => {
        this.setState({ allbatches: false })
        console.log("Error in getting batch records!!!", error);
      });
  } // end component did mount

  getBatchDetails = (batchselected) => {
    //let bid = batchselected.bid;      
    this.setState({
      batchdet: batchselected,
      details: true,
      allbatches: false
    }, () => console.log("selected bxz cvc nbmatch",
      this.state.batchdet));
  }

  deleteBatch = (batchid) => {
    let batchrecords = this.state.batchrecords.filter(batch => {
      return batch.recid !== batchid
    });
    this.setState({
      batchrecords:batchrecords,
      allbatches: true
    });
  }

  render() {
    const stbatchrec = this.state.batchrecords;
    //console.log("Display all batch details --",this.props);
    if (this.props.usertype === "boardmember" || this.props.usertype === "instructor")
    {return (<div className="container">
             <div className = "middlecontent">
          {this.state.allbatches ?
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Course</th>
                  <th>Level</th>
                  <th>Instructor</th>
                  <th>Number of Students</th>
                  <th>Number of classes</th>
                </tr>
              </thead>
              <tbody>{stbatchrec.map((data, index) =>
                <BatchRecord
                  bid={data.recid}
                  bdesc={data.recdesc}
                  bsubj={data.recsubj}
                  blevel={data.reclevel}
                  teacher={data.teacher}
                  students={data.noofstu}
                  classes={data.noofclasses}
                  getBatchDetails={this.getBatchDetails}
                  key={index}
                />
              )}
              </tbody>
            </table>
            : <div>  {this.state.batchdet ?
                    <BatchInfo
                      batchdetails={this.state.batchdet}
                      newbatch={false}
                      deleteBatch = {this.deleteBatch}
                    />
                    : <div></div>}
             </div>  
          }    
          </div>           
         </div>
        ); // end return
      }// end if props.usertype is boardmember
     else{
        return(<Homepage msg="Please Login"/>);
     }
    } //end render
  } //end allbatches

 
  const mapStateToProps = (state) => { 
    console.log("Map State to Props : ",state);
    return {
      loginemail:state.loginemail,
      userfname:state.userfname,
      userlname:state.userlname,
      usertype:state.usertype,
      userid:state.userid
    }
    
  }
  export default connect(mapStateToProps)(Allbatches);    

  // export default Allbatches;

  
  

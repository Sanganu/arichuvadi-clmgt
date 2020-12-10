import React, { Component } from 'react';
import API from '../../API/Batch';
import BatchRecord from './Getbatchdetails';
import BatchInfo from './BatchInfo';
import Homepage from "../general/Homepage";
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
    allbatches: this.props.displayall || this.props.location.displayall || true,
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
   if (this.props.usertype === "management") {
      API.getAllBatch()
        .then(response => {
          console.log("The Batch Details of  - axios call", response.data, this.props);
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

            this.setState({
              batchrecords: batchrecords,
              allbatches: true
            })
            // ,() => { console.log("State of records") });
          } else {

            console.log("Axios No records exist");

          }
        }) // end then
        .catch(error => {
          this.setState({ allbatches: false })
          console.log("Error in getting batch records!!!", error);
          return (<Homepage msg="Please Login" />);
        });
    }
    else {
      console.log("Console error",this.props.usertype)
      return (<Homepage msg="Please Login" />);
    }
  } // end component did mount


  componentWillReceiveProps =(nextprops) => {
    console.log("NextProps",nextprops)
    const { displayall } = this.props.match.params

    if(displayall === "alltrue"){
      this.setState({allbatches:true},()=> console.log("state allbatches",this.setdisplayall.displayall))
    }
  }

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
      batchrecords: batchrecords,
      allbatches: true
    });
  }

   setdisplayall=()=>{
 
   }
  render() {
    const stbatchrec = this.state.batchrecords;
    console.log("Display all batch details --",this.props);
    if (this.props.usertype === "management") {
      return (<div className="container">
        <div className="middlecontent">
              {this.state.allbatches?
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
       
                :  <BatchInfo
                    batchdetails={this.state.batchdet}
                    newbatch={false}
                    deleteBatch={this.deleteBatch}
                  
                  />}
             </div>
           </div> //End container
      ); // end return
    }// end if props.usertype is boardmember
    else {
      return (<Homepage msg="Please Login as Board member to see all batches" />);
    }
  } //end render
} //end allbatches


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




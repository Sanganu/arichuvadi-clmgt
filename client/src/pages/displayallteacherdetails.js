import React, { Component } from 'react';
import axios from 'axios';
import Teacherrecords from './teacherrecords';


class Allteachers extends Component {
  state = {
    teacherrecords: [],

  }

  componentDidMount = () => {
    //  console.log("displayallteachers -- component before axios call",this.props);
    let batchrecords = this.state.batchrecords;
    let allbatches = false
    axios.get('/api/teacher/all')
      .then(response => {
        console.log("The Teacheretails of  - axios call", response.data);
        this.setState({
          teacherrecords : response.data
        })
      })
      .catch(error => {
        this.setState({})
        //console.log("Error in getting batch records!!!", error);
      });
  } // end component did mount

  getTeacherDetails = (teacherselected) => {
    //let bid = batchselected.bid;      
    this.setState({
      teacherdet: teacherselected,
      details: true,
      allteachers: false
    }, () => console.log("selected bxz cvc",
      this.state.batchdet));
  }

  render() {
    const stbatchrec = this.state.batchrecords;
    return (<div className="middlecontent">
            {this.state.allteachers ?
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th>Teacher</th>
                      <th>Batches</th>
                      <th>Number of Batches</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.teacherrecords ? 
                       <Teacherrecords />:<h2>No Teacher details </h2>}
                </tbody>
                </table>
            : <div></div> }
          </div>); // end return
  } //end render
} //end allteachers
export default Allteachers;



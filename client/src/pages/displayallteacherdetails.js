import React, { Component } from 'react';
import axios from 'axios';
import BatchRecord from './Getbatchdetails';
import BatchInfo from './BatchInfo';
import Topmenu from '../components/Topmenu';

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
        //console.log("The Teacheretails of  - axios call", response.data);
        
        })
        .catch(error => {
        this.setState({})
        //console.log("Error in getting batch records!!!", error);
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

  render() {
    const stbatchrec = this.state.batchrecords;
    return (<div className="container">
      <div className="row" >
        <div className="col-lg-1 col-md-1 col-sm-12">
          <Topmenu />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11">
          <div className = "middlecontent">
          {this.state.allbatches ?
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Batches</th>
                  <th>Students</th>
                  <th></th>
                  <th></th>
                  <th>Number of classes</th>
                </tr>
              </thead>
              <tbody>
              )}
              </tbody>
            </table>
            : <div>  {this.state.batchdet ?
                    <BatchInfo
                      batchdetails={this.state.batchdet}
                      newbatch={false}
                    />
                    : <div></div>}
             </div>  
          }    
          </div>           
         </div>
         </div>
      </div>); // end return
      } //end render
  } //end allbatches
  export default Allteachers;
  
  

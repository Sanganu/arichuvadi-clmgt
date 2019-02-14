import React,{ Component } from 'react';
import axios from 'axios';
// import BatchRecAddclass from './Addclassdetails';
import BatchRecord from './Getbatchdetails';
import BatchInfo from './BatchInfo';
import Teacherheader from '../components/Teacherheader';
import Topmenu from './Topmenu';

class Allbatches extends Component
{
   state = {
     batchrecords: [],
     diplayclass : false,
     recid : '',   
     recdesc : '',
     recsubj : '',
     reclevel: '',
     recrate : '',
     allbatches: true,
     sbatchid: '',
     sbdesc: '',
     srate: '',
     slevel: '',
     sbsubj: '',
     student: '',
     details: false
   }        

    componentDidMount = () => {
          // console.log("Inside component displayallbatchdetails before placing the axios call");
          let batchrecords = this.state.batchrecords;
          let allbatches = false
          axios.get('/api/teacher/batch/all')
              .then(response =>
                {
                  console.log("The Batch Details of  - axios call");
                  if (response.data.length > 0){
                      for (let i =0; i<response.data.length;i++)
                      {
                        console.log("Records",response.data[i]._id,response.data[i].batchdesc,response.data[i].batchid,response.data[i].subject,response.data[i].level,response.data[i].rateperhour);
                          let currentrec = {
                                  recid: response.data[i]._id,
                                  recdesc: response.data[i].batchdesc,
                                  recsubj: response.data[i].subject,
                                  reclevel: response.data[i].level,
                                  recrate: response.data[i].rateperhour
                                  //recstudents: response.data[i].students
                          }
                        batchrecords.push(currentrec);
                      } // end for
                  
                        console.log("Axios No records exist");
                        allbatches = true;
                        this.setState({
                          batchrecords : batchrecords,
                          allbatches:allbatches},
                            () => { console.log("State of records")});
                   }    
                }) // end then
                 .catch( error => {     
                  this.setState({allbatches : false})
                  console.log("Error in getting batch records!!!",error);
                });
    } // end component did mount

    getBatchDetails = (batchselected) => {
      //let bid = batchselected.bid;      
            this.setState({
                batchdet : batchselected,
                details: true,
                allbatches: false
              }, () => console.log("selected bxz cvc nbmatch",this.state.batchdet));  
    }

    render()
    {
      const stbatchrec = this.state.batchrecords;   
      return(<div>
                    <Teacherheader />
                    <div>
                              {this.state.allbatches ?
                                  <div>
                                  <Topmenu />
                                  <table className = "table table-hover table-responsive">
                                      <thead>
                                      </thead>
                                      <tbody>{stbatchrec.map((data,index) =>
                                              <BatchRecord
                                                          bid = {data.recid}
                                                          bdesc = {data.recdesc}
                                                          bsubj = {data.recsubj}
                                                          blevel = {data.reclevel}
                                                          brate = {data.recrate}
                                                          studentdet =  {data.recstudents}
                                                          getBatchDetails = {this.getBatchDetails }
                                                          key={index}
                                                              />
                                              )}
                                      </tbody>
                                  </table>
                                  </div> :
                                  <div>{this.state.details ?
                                         <BatchInfo 
                                            batchdetails = {this.state.batchdet}
                                            newbatch = {false}
                                            />
                                      :<p></p>
                                    }
                                 </div>
                                }
                      </div>   
             </div>); // end return
      } // end render
} //end allbatches
export default Allbatches;



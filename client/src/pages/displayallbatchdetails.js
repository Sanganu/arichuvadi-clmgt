import React,{ Component } from 'react';
import axios from 'axios';
// import BatchRecAddclass from './Addclassdetails';
import BatchRecAddclass from './Getbatchdetails';
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
     allbatched: true
   }

  //axios.get('/api/teachers/')
    componentDidMount = () => {
          console.log("Inside component displayallbatchdetails before placing the axios call");
          let batchrecords = this.state.batchrecords;

          axios.get('/api/teacher/batch/all')
              .then(response =>
                {
                  console.log("The Batch Details of  - axios call");
                  for (let i =0; i<response.data.length;i++)
                  {
                    //  console.log("Records",response.data[i]._id,response.data[i].batchdesc,response.data[i].batchid,response.data[i].subject,response.data[i].level,response.data[i].rateperhour);
                      let currentrec = {
                              recid: response.data[i]._id,
                              recdesc: response.data[i].batchdesc,
                              recsubj: response.data[i].subject,
                              reclevel: response.data[i].level,
                              recrate: response.data[i].rateperhour,
                              recstudents: response.data[i].students
                      }
                    batchrecords.push(currentrec);
                  } // end for
                  this.setState({batchrecords : batchrecords}, () => { console.log("State of records",this.state.batchrecords)});

                }) // end then
                .catch( error => {
                  console.log("Error in getting batch records!!!",error);
                });
    } // end component did mount

    getBatchDetails = () =>{
            console.log("Inside getbatchetails")
    }

    render()
    {
      const stbatchrec = this.state.batchrecords;   
      return(<div>
                    <Teacherheader />
                    <Topmenu />
                    <div className = "table-responsive">
                      <table className = "table table-hover">
                          <thead>

                          </thead>
                          <tbody>
                               {this.state.allbatches ?
                                <div>{stbatchrec.map((data,index) =>
                                          <BatchRecAddclass
                                                      bid = {data.recid}
                                                      bdesc = {data.recdesc}
                                                      bsubj = {data.recsubj}
                                                      blevel = {data.reclevel}
                                                      brate = {data.recrate}
                                                      studentdet =  {data.recstudents}
                                                      getBatchDetails = {this.getBatchDetails }
                                                      key={index}
                                                       />
                                )}</div>:<div></div>}
                           </tbody>
                       </table>
                    </div>
                   

            </div>); // end return
      } // end render
} //end allbatches
export default Allbatches;

/*
<button className ="btn btn-large-info" id = "blogin" onClick={this.onClassclick}>Add Class Details</button>
{this.displayclass ? <Addclassdetails btrecs = {this.state.batchrecords}/> :<div></div>}
*/

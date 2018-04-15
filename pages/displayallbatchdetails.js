 import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Listbatch from './Listbatch';
import BatchRecAddclass from './Addclassdetails';
import Teacherheader from '../components/Teacherheader';


class Allbatches extends Component
{
   state = {
     batchrecords: [],
     diplayclass : false,
     recid : '',
     recbatid : '',
     recdesc : '',
     recsubj : '',
     reclevel: '',
     recrate : ''
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
                         recbatid: response.data[i].batchid,
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


    render()
    {
      const stbatchrec = this.state.batchrecords;
      return(<div>
                    <Teacherheader />

                    <div className = "table-responsive">
                      <table className = "table table-hover">
                          <thead>

                          </thead>
                          <tbody>
                                {stbatchrec.map((data,index) =>
                                          <BatchRecAddclass
                                                      bid = {data.recid}
                                                      bdesc = {data.recdesc}
                                                      bsubj = {data.recsubj}
                                                      blevel = {data.reclevel}
                                                      brate = {data.recrate}
                                                      studentdet =  {data.recstudents}
                                                      key={index}
                                                       />
                                )}
                           </tbody>
                       </table>
                    </div>
                    <div className = "otherlinks">
                           <Link to = '/teacher/batchmain' className = 'mainlink'>Create New Batch</Link>
                           <Link to = '/teacher/studentrecords' className = 'mainlink'>Search Student Records</Link>
                           <Link to = '/teacher/batchrecords' className = 'mainlink'>Search Batch Records</Link>
                    </div>

            </div>); // end return
      } // end render
} //end allbatches
export default Allbatches;

/*
<button className ="btn btn-large-info" id = "blogin" onClick={this.onClassclick}>Add Class Details</button>
{this.displayclass ? <Addclassdetails btrecs = {this.state.batchrecords}/> :<div></div>}
*/

import React, { Component } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import {Link} from 'react-router-dom';

//import Classentry from './Classentry';
//import Teacherheader from '../components/Teacherheader';
// const customStyle = {
//       content: {
//         top:'50%',
//         left:'50%',
//         right:'auto',
//         bottom:'auto',
//         marginRight:'-50%',
//         transform: 'translate(-50%,-50%)',
//         color:  'hsla(360, 100%, 8%, 1)'
//       }
// };

class BatchRecAddclass extends Component
{

        // componentWillReceiveProps = () => {
        //   console.log("Props",this.props);
        //   console.log("student",this.props.studentdet)           

      getBatchDet = () => 
      {
        
        let newbatch = {
          bid : this.props.bid,
          batchdesc:this.props.bdesc,
          subject: this.props.bsubj,
          level: this.props.blevel,
          rateperhour : this.props.brate
          // students: this.props.studentdet
        }
        this.props.getBatchDetails(newbatch)
      }           

      render()
      {
         return(<tr className = "addclass" onClick = {this.getBatchDet}>
                                      <td>{this.props.bdesc}</td>
                                      <td>{ this.props.bsubj}</td>
                                      <td>{this.props.brate}</td>
                                      <td>{this.props.blevel}</td> 
                                      <td>{this.props.bid}</td> 
                </tr>) //end return
      } // end render
} // end component

export default BatchRecAddclass;

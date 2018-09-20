import React, { Component } from 'react';
class BatchRecAddclass extends Component
{
     getBatchDet = () => 
      {
        let newbatch = {
          bid : this.props.bid,
          batchdesc:this.props.bdesc,
          subject: this.props.bsubj,
          level: this.props.blevel,
          rateperhour : this.props.brate
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

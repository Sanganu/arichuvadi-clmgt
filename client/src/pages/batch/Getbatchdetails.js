import React, { Component } from 'react';
class BatchRecAddclass extends Component {
  getBatchDet = () => {
    let newbatch = {
      bid: this.props.bid,
      batchdesc: this.props.bdesc,
      course: this.props.bsubj,
      level: this.props.blevel,
      instructor: this.props.teacher,
      examDate: this.props.examDate
    }
    console.log("get batch details",newbatch)
    this.props.getBatchDetails(newbatch)
  }

  render() {
    return (<tr className="addclass" onClick={this.getBatchDet}>
      <td>{this.props.bdesc}</td>
      <td>{this.props.bsubj}</td>
      <td>{this.props.blevel}</td>
      <td>{this.props.examDate}</td>
      <td>{this.props.students}</td>
      <td>{this.props.classes}</td>
      <td>{this.props.teacher}</td>
      <td><button onClick={()=>this.props.deleteBatch(this.props.bid)}>Delete</button></td>
    </tr>) //end return
  } // end render
} // end component

export default BatchRecAddclass;

import React,{Component} from 'react';
import axios from 'axios';

class Eachstudent extends Component{
  render(){
      return(<option value={this.props.studentid}>
          {this.props.fname} {this.props.lname}
          </option>)
  }
}

export default Eachstudent;

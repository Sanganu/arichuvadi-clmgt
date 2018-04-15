import React, { Component } from 'react';
import axios from 'axios';

class Completebatchdetails extends Component{

  constructor(props) {
    super(props);
    this.state = {
      batchdetails: {},
      studendetails: [],
      classdetails: [],
    }
  }
  componentDidMount = () => {
    this.getBatchDetails();
  }

  getBatchDetails = () => {
      axios.get("/api/batch/class/students")
            .then(response => {
                 console.log("batch details fetched",response);
            }) //end then
            .catch(error => {
               console.log("Error in retriving batch details",error);
            }); //end catch

  } // end getBatchDEtails

  render(){
    return(<div>
            <table>
                    <tbody>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tbody>
            </table>
            <table>
                <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tbody>
            </table>
    </div>) //end return
  }; // end render

} // end component

export default Completebatchdetails;

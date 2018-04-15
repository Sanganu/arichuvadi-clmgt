import React, { Component } from 'react';
import axios from 'axios';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Createbatch extends Component {
    constructor(props){
        super(props);
        this.state = {
          batchdesc:"",
          subject: "Music",
          level: "Beginner",
          rateperhour: '30',
          batchdet: '',
          errmsg : '',
            };
    }

    handleInputChange = (event) => {
          const target = event.target;
          const value = target.value;
          const name  = target.name;
          //console.log('The Value in input change',value,name);

          this.setState({
             [name]: value
           });
    };

    handleClassCreation = (event) => {
            event.preventDefault();
             console.log("In Class Creation state values",this.state);
             //var myDate = new Date(this.state.startdate);
             if(  this.state.batchdesc === "" ||
                 this.state.subject === "" ||
                 this.state.level === "" ||
                this.state.rateperhour === "")
                {
                  console.log("No Empty Fields Enter valid data");
                  this.setState({errmsg : "No Empty Fields Enter valid data"});
                }
            else {
             axios.post('/api/teacher/batch/new',
                      {
                            batchdesc : this.state.batchdesc,
                            subject: this.state.subject,
                            level : this.state.level,
                            rateperhour : this.state.rateperhour
                      })
                  .then(response =>
                    {
                        console.log("The response -newbatch- axios call-Createbatcg",response);
                        console.log("The inserted record ID",response.data._id);

                        let newbatch = {
                          bid : response.data._id,
                          batchdesc:response.data.batchdesc,
                          subject: response.data.subject,
                          level: response.data.level,
                          rateperhour: response.data.rateperhour,

                        }
                        this.props.onInsert(newbatch)
                        //window.location = '/teacher/batch/addstudent/'+response._id;
                        //return <Addstudent />
                    })
                    .catch(error => {
                        this.setState({errmsg: error.errstring +" Please check console for further details"},() =>
                         {
                             console.log("Error in Adding Batch",error.err);
                         });

                    }); //end new batch creation - axios call
                  } //end if
        }; // end handleclasscreation

      render() {
        return(<div>
                        <Teacherheader />
                        <form  className="inputsection">
                            <h5 className = "subcr">Create New Batch</h5>
                            <p className="errmsg">{this.state.errmsg}</p>
                              <div className = "form-group row">
                                 <label forhtml ="batchdesc">Batch Description  </label>
                                 <input type = "text"  id = "batchdesc" className="form-control" value={this.state.batchdesc} onChange = {this.handleInputChange} name = "batchdesc" />
                             </div>
                             <div className = "form-group row">
                                     <label forhtml ="subject">Subject  </label>
                                     <select className ="form-control" value={this.state.subject} onChange = {this.handleInputChange} name ="subject" id="subject">
                                         <option value ='Music'>Music</option>
                                          <option value ='Dance'>Dance</option>
                                     </select>
                             </div>
                             <div className = "form-group row">
                                 <label forhtml = "rateperhour">Rate per class per student($) </label>
                                 <input type = "text"   id = "rateperhour" className="form-control" value={this.state.rateperhour} onChange = {this.handleInputChange} name = "rateperhour" />
                            </div>
                            <div className = "form-group row">
                                 <label forhtml = "level">Level : </label>
                                 <select className ="form-control" onChange = {this.handleInputChange} name ="level" id="level">
                                     <option value ='Beginner'>Beginner</option>
                                     <option value ='Intermediate'>Intermediate</option>
                                     <option value ='Advance'>Advance</option>
                                 </select>
                            </div>
                            <br />
                             <button className = "createbutton"  name = "clcreation"  onClick = {this.handleClassCreation}>Create Batch</button>
                        </form>
                        <Footer />
                  </div>
              ) // end of return
      } // end of render

} // end class

export default Createbatch;

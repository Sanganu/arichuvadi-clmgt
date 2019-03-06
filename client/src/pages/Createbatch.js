import React, { Component } from 'react';
import axios from 'axios';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';

class Createbatch extends Component {
    state = {
          batchdesc:"",
          subject: "Beginner",
          level: "Beginner",
          instructor: 'Chitra',
          batchdet: '',
          errmsg : '',
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

    handleBatchCreation = (event) => {
            event.preventDefault();
             console.log("Create Batch -- Creation state values",this.state);
             //var myDate = new Date(this.state.startdate);
             if(  this.state.batchdesc === "" ||
                 this.state.course === "" ||
                 this.state.level === "" ||
                this.state.instructor === "")
                {
                  console.log("No Empty Fields Enter valid data");
                  this.setState({errmsg : "No Empty Fields Enter valid data"});
                }
            else {
             console.log("Before axios call - create batch");
             axios.post('/api/teacher/batch/new',
                      {
                            batchdesc : this.state.batchdesc,
                            course: this.state.course,
                            level : this.state.level,
                            instructor : this.state.instructor
                      })
                  .then(response =>
                    {
                        console.log("The response -newbatch- axios call-Createbatcg",response);
                        console.log("The inserted record ID",response.data._id);

                        let newbatch = {
                          bid : response.data._id,
                          batchdesc:response.data.batchdesc,
                          course: response.data.course,
                          level: respnse.data.level,
                          instructor: response.data.instructor,
                         }
                         console.log("BAtch creation");
                        this.props.onInsert(newbatch)
                        //window.location = '/teacher/batch/addstudent/'+response._id;
                        //return <Addstudent />
                    })
                    .catch(error => {
                        this.setState({errmsg: error.errstring +" Please check console for further details"},
                        () =>
                         {
                             console.log("Error in Adding Batch",error.err);
                         });

                    }); //end new batch creation - axios call
                  } //end if
        }; // end handleclasscreation

      render() {
        return(<div>
                  
                        <form  className="inputsection">
                            <h5 className = "subcr">Create New Batch</h5>
                            <p className="errmsg">{this.state.errmsg}</p>
                         
                             <div className = "form-group row">
                                <label className="has-float-label">Batch Name    </label>
                                <input type = "text"  className = "form-control" id = "batchdesc" className="form-control" value={this.state.batchdesc} onChange = {this.handleInputChange} name = "batchdesc" />
                             </div>
                             <div className = "form-group row">
                                 <label forhtml = "course">Course : </label>
                                 <select className ="form-control" onChange = {this.handleInputChange} name ="course" id="course">
                                     <option value ='Beginner'>Beginner</option>
                                     <option value ='Intermediate'>Intermediate</option>
                                     <option value ='Advance'>Advance</option>
                                 </select>
                            </div>
                             <div className = "form-group row">
                                     <label forhtml ="level">Level </label>
                                     <select className ="form-control" value={this.state.level} onChange = {this.handleInputChange} name ="level" id="level">
                                         <option value ='1'>Level -1</option>
                                          <option value ='2'>Level -2</option>
                                          <option value ='3'>Level -3</option>
                                          <option value ='4'>Level -4</option>
                                          <option value ='5'>Level -5</option>
                                     </select>
                             </div>
                             <div className = "form-group row">
                                 <label forhtml = "instructor">Instructor </label>
                                 <input type = "text"   id = "instructor" className="form-control" value={this.state.instructor} onChange = {this.handleInputChange} name = "instructor" />
                            </div>
                       
                            <br />
                             <button className = "createbutton"  name = "clcreation"  onClick = {this.handleBatchCreation}>Create Batch</button>
                        </form>
                        <Footer />
                  </div>
              ) // end of return
      } // end of render

} // end class

export default Createbatch;

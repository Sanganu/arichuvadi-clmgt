import React,{ Component } from 'react';
import axios from  'axios';

class Addteacher extends Component{
        

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name  = target.name;
        this.setState({
            [name] : value
        },() => {
           console.log('The Value in input change',value,name);
        });
        
    }

    handleTeacherAccountCreation = (event) => {
                        event.preventDefault();
                        console.log("In Teacher Account Creation state values",this.state);
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
                        axios.post('/api/teacher/new',
                                {

                                })
                            .then(response =>
                                {
                                    console.log("The response createe Teacher Account",response);
                                    console.log("The  inserted record ID",response.data._id);

                                    let newteacher = {
                                        
                                    }
                                    //window.location = '/teacher/batch/addstudent/'+response._id;
                                    //return <Addstudent />
                           })
                            .catch(error => {
                                    this.setState({errmsg: error.errstring +" Please check console for further details"},() =>
                                    {
                                        console.log("Error in Adding Teacher details",error.err);
                                    });

                            }); //end new batch creation - axios call
                        } //end if
     };  // end handleclasscreation

     render(){
            return(<div>
     
     <div className="middlecontent">
             
             <div className="col-lg-8 col-sm-8">
                 <form className="inputsection">
                     <h5 className="subcr">New Cohort</h5>
                     <p className="errmsg">{this.state.errmsg}</p>

                     <div className="form-group row">
                         <label className="has-float-label">Name    </label>
                         <input type="text"
                             className="form-control"
                             id="batchdesc"
                             value={this.state.batchdesc}
                             onChange={this.handleInputChange}
                             name="batchdesc" />
                     </div>
                     <div className="form-group row">
                         <label forhtml="course">Course : </label>
                         <select className="form-control droplist"
                             onChange={this.handleInputChange}
                             value={this.state.course} name="course" id="course">
                             <option value='Beginner'>Beginner</option>
                             <option value='Intermediate'>Intermediate</option>
                             <option value='Advance'>Advance</option>
                         </select>
                     </div>
                     <div className="form-group row">
                         <label forhtml="level">Level </label>
                         <select className="form-control droplist" value={this.state.level} onChange={this.handleInputChange} name="level" id="level">
                             <option value='Level 1'>Level -1</option>
                             <option value='Level 2' default>Level -2</option>
                             <option value='Level 3'>Level -3</option>
                             <option value='Level 4'>Level -4</option>
                             <option value='Level 5'>Level -5</option>
                         </select>
                     </div>
                     <div className="form-group row">
                         <label forhtml="instructor">Instructor </label>
                         <input type="text" id="instructor" className="form-control" value={this.state.instructor} onChange={this.handleInputChange} name="instructor" />
                     </div>

                     <button className="createbutton" name="clcreation" onClick={this.handleBatchCreation}>Create Batch</button>
                 </form>
             </div>
           </div>

            </div> );
     }
}
export default Addteacher;

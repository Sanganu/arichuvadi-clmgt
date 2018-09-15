import React, { Component } from 'react';
import axios from 'axios';
import Addstudent from './Addstudent.js';
import BatchAddClassDetails from './Addclassdetails.js';

class BatchInfo extends Component {
    state = {
      bid: this.props.batchdetails.bid || '',
      bdesc: this.props.batchdetails.batchdesc || '',
      rate: this.props.batchdetails.rateperhour || '',
      level: this.props.batchdetails.level || '',
      subject: this.props.batchdetails.subject||'',
      students: this.props.batchdetails.students || '',
      bdescription: this.props.batchdetails.batchdesc || ''
    }

    deleteStudent = () => {
        axios.delete('/api/teacher/student/delete',
                    {
                      batchid:this.props.bid
                    })
            .then(response =>
              {
                 console.log("Student Details deleted ")
              }) //end then
              .catch( error => {
                           console.log("Error in deleting batch student class records!!!",error);
 
                            
              }); // end catch
      } //end of delete student

      updateBatch = () => {
        console.log("Batch Update:",this.state.bid,this.state.bdesc,this.state.rate,this.state.level,this.state.subject,this.state.students);
        axios.put('/api/teacher/batch/update',
                  {
                    batchid:this.state.bid,
                    batchdesc : this.state.bdesc,
                    subject : this.state.subject,
                    level : this.state.level,
                    rate : this.state.rate
                  })
                  .then((response) => 
                  {
                    console.log("The response from update"+ response);
                    this.setState({ bdescription:this.state.bdesc}, () =>{
                      console.log("The set state",this.state.bdescription);
                    });
                  })
                  .catch( error => {
                    this.setState({errmsg : "Error in saving class records"+error,updatestatus: 'Error in updating class details'+error},
                          () =>{
                               console.log("Error in saving class records!!!",error);
                          });
                  }); // end catch
      } // end of update batch

      handleInputChange = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.name : target.value;
            const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
            this.setState({
              [name]: value
            });
      } //End handle Input change


    constructor(props){
      super(props);
      this.State ={
        bdesc: this.props.bdesc,
        rate : this.props.rate,
        level : this.props.level,
        subject: this.props.subject,
        bid: this.props.bid,
        students: this.props.students
      }//,
      console.log("Batchinfo - props student records++++",this.state.students,"Props=======",this.props.batchdetails);
    }  // end of componentwillreceiveprops

    render()
    {
        return(<div>
                <form>
                    <div className ="form-group">
                      <label htmlFor="bdesc" className= "bmd-label-floating" >{this.state.bdescription}</label>
                      <input className="form-control" value={this.state.bdesc} placeholder={this.state.bdesc} name = "bdesc" id="bdesc" onChange = {this.handleInputChange}/>
                    </div> 
                    <input value={this.state.rate} placeholder= {this.state.rate}  name = "rate" onChange = {this.handleInputChange}/>
                    <input value = {this.state.level} placeholder ={this.state.level} name = "level" onChange = {this.handleInputChange}/>
                    <input value = {this.state.subject} placeholder = {this.state.subject} name = "subject" onChange = {this.handleInputChange} />
                    <label>{this.state.students}</label>
                    <button onClick = {this.updateBatch}>Save Changes</button>
                </form>  
              <Addstudent batchdet = {this.props.batchdetails} />
              <BatchAddClassDetails batchdet = {this.props.batchdetails} />
              </div>)
    } // end of render
} //end component

export default BatchInfo;

  
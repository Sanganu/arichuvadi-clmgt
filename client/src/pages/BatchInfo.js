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
      bdescription: this.props.batchdetails.batchdesc || '',
      studentrecs: '',
      classrecs: ''
    }

    deleteStudent = () => {
        axios.delete('/api/teacher/student/delete',
                    {
                      batchid:this.props.bid
                    })
            .then(response =>
              {
                 console.log("Student Details deleted from Batch",response)
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

    componentDidMount = () => {
      let bid = this.props.batchdetails.bid;
      let strecs = this.state.studentrecs;
      let clrecs = this.state.classrecs;
      console.log("The batch selected details received",this.props)
      if( this.props.newbatch === false)
      {
        axios.get('/api/teacher/batch/student/class/details/'+bid)
        .then(response => {
          console.log("The Existing Students & Class",response.data);
          if( response.data.srecords.length > 0)
          {
               for(let i =0; i <response.data.srecords.length;i++)
               { 
                 let newstrec = {
                   stdfname  : response.data[i].studentfname,
                   stdlname : response.data[i].studentlname,
                   stdemail : response.data[i].loginemail,
                   phonenumber: response.data[i].phonenumber
                   }
                strecs.push(newstrec);  
               } // end for loop
                     
               this.setState({studentrecs : strecs},() => {
                   console.log("Set State:",this.state.studentrecs)
                 }); // End Set state 
            } ;// end if part
            if( response.data.crecords.length > 0)
            {
                 for(let i =0; i <response.data.crecords.length;i++)
                 {
                   let newclrec = {
                     lessoncov : response.data[i].lessoncovered,
                     homework : response.data[i].homework,
                     cldate : response.data[i].classdate
                     }
                  clrecs.push(newclrec);  
                 } // end for loop
                       
                 this.setState({studentrecs : strecs,
                     classrecs : clrecs},() => {
                     console.log("Set State:",this.state.studentrecs)
                   }); // End Set state 
              } ;// end if part
        }) // end then part
        .catch(error => {
          console.log("The Error Encountered in fetching exiting students and class details",error);
        }); // End Axios
      } // End if part
   } // End ()

    //   componentDidMount = () => {
    //     let bid = this.state.bid;
    //     let strecs = this.state.studentrecs;
      
    //    axios.get('/api/teacher/batch/student/details/'+bid)
    //         .then(response => {
    //           console.log("The Existing Students",response.data);
    //           if( response.data.length > 0)
    //           {
    //                for(let i =0; i <response.data.length;i++)
    //                {
    //                  let newstrec = {
    //                zaAXSCAX D    stdfname : response.data[i].studentfname,
    //                    stdlname : response.data[i].studentlname,  
    //                    stdemail : response.data[i].loginemail,
    //                    phonenumber: response.data[i].phonenumber
    //                    }
    //                 strecs.push(newstrec);
    //                } // end for loop
    //                this.setState({studentrecs : strecs},() => {
    //                    console.log("Set State:",this.state.studentrecs)
    //                  }); // End Set state 
    //           } ;// end if part
    //         }) // end then part
    //         .catch(error => {
    //           console.log("The Error Encountered in fetching exiting students details",error);
    //         });
    //  }; // End Componentdidmount
   

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

  
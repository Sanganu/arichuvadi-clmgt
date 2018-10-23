import React, { Component } from 'react';
import axios from 'axios';
import Addstudent from './Addstudent.js';
import BatchAddClassDetails from './Addclassdetails.js';
import Allstudents from './displayallstudents.js';
import Allclasses from './displayallclassdetails.js';  

class BatchInfo extends Component {  
    state = {
      bid: this.props.batchdetails.bid || '',
      bdesc: this.props.batchdetails.batchdesc || '',
      rate: this.props.batchdetails.rateperhour || '',
      level: this.props.batchdetails.level || '',
      subject: this.props.batchdetails.subject||'',
      students: this.props.batchdetails.students || '',
      bdescription: this.props.batchdetails.batchdesc || '',
      studentrecs: [],
      classrecs: [],
      delstdid: ''
    }

     
    deleteStudent = (stdid) => {
          console.log("BatchInfo",stdid,this.state.bid);//his.props.batchdetails.bid);
          this.setState({delstdid: stdid})
           axios.delete('/api/batch/student/delete/'+stdid+"/"+this.state.bid, //+this.state.bid+'/'+stdid
                    {
                      batchid:this.state.bid,
          //            studentid: this.state.delstdid 
                    }
                  )
            .then(response =>
              {
                 console.log("Student Details deleted from Batch",response)
              }) //end thencd 
              .catch( error => {
                           console.log("Error in deleting batch student class records!!!",error);
              }); // end catch
      } //end of delete student

      updateBatch = (event) => {
        event.preventDefault();
        //console.log("Batch Update:",this.state.bid,this.state.bdesc,this.state.rate,this.state.level,this.state.subject,this.state.students);
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
       
    handleNewStudent = (nstudent) => {
      console.log("The student records",nstudent);  
      let studentrecs = this.state.studentrecs;
      let newstrec = {
        stdid: nstudent.stdid,
        stdfname  : nstudent.stdfname,
        stdlname : nstudent.stdlname,
        stdemail : nstudent.stdemail,
        phonenumber: nstudent.phonenumber
        } 
      studentrecs.push(newstrec);
      this.setState({
        studentrecs : studentrecs
      },() =>{ console.log("The Student Records - update with add student",studentrecs);});
    }

    handleClassDetails = (nclass) => {
      let classrecs = this.state.classrecs;
      console.log("The class details",nclass); 
      classrecs.push(nclass);
      this.setState({classrecs},() => {console.log("Class details",classrecs)});
    }

    componentDidMount = () => {
      let bid = this.props.batchdetails.bid;
      let strecs = this.state.studentrecs || [];
      let clrecs = this.state.classrecs || [];
      //console.log("The batch selected details received",this.props)
      if( this.props.newbatch === false)
      {
        axios.get('/api/teacher/batch/student/class/details/'+bid)
        .then(response => {
          // console.log("The Existing Students & Class",response.data);
          // console.log("The Student records length",response.data.srecords.length);
          // console.log("The class records length",response.data.crecords.length);
          if( response.data.srecords.length > 0)
          {
               for(let i =0; i <response.data.srecords.length;i++)
               { 
                 let newstrec = {
                   stdid: response.data.srecords[i]._id,
                   stdfname  : response.data.srecords[i].studentfname,
                   stdlname : response.data.srecords[i].studentlname,
                   stdemail : response.data.srecords[i].loginemail,
                   phonenumber: response.data.srecords[i].phonenumber
                   } // end rec
                  strecs.push(newstrec);  
               } // end for loop
              // console.log("The student recs",strecs);  
            } ;// end if srecords part

           if( response.data.crecords.length > 0)
            {
                 for(let i =0; i <response.data.crecords.length;i++)
                 {
                   let newclrec = {
                     lessoncov : response.data.crecords[i].lessoncovered,
                     homework : response.data.crecords[i].homework,
                     cldate : response.data.crecords[i].classdate
                     }
                  clrecs.push(newclrec);  
                 } // end for loop
            } 
           // end if crecords part         
            this.setState({studentrecs : strecs,
                     classrecs : clrecs},() => {
                     console.log("Set State:",this.state.studentrecs,this.state.classrecs);
                   }); // End Set state 
        }) // end then part
        .catch(error => {
          console.log("The Error Encountered in fetching exiting students and class details",error);
        }); // End Axios
      } // End if part
   } // End ()

    render()
    {  const studentrec = this.state.studentrecs;
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
                    <Addstudent batchdet = {this.props.batchdetails} 
                                newStudent = {this.handleNewStudent} />
                    <BatchAddClassDetails batchdet = {this.props.batchdetails} 
                                          newClassDetails = {this.handleClassDetails}/>
                    <div className = "table-responsive">
                                  <table className = "table table-hover">
                                  <tbody>
                                  <         tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                  </tr>
                                  {studentrec.map((data,index) => (
                                  <Allstudents studentrec = {data}
                                               deleteStudentDetails = {this.deleteStudent}
                                              key = {index}
                                                />))}
                                  </tbody>    
                                  </table>
                      </div>
                      <div className = "table-responsive">
                                  <table className = "table table-hover">
                                  <tbody>
                                  <tr>
                                        <th>Lessons Covered</th>
                                        <th>Homework</th>
                                        <th>Date</th>
                                  </tr>
                                  
                                  <Allclasses classrecs = {this.state.classrecs}/>
                                  </tbody>    
                                  </table>
                      </div>        
                </div>) 
    } // end of render
} //end component

export default BatchInfo;

  
import React, { Component } from 'react';
import axios from 'axios';
import Addstudent from './Addstudent.js';

class BatchInfo extends Component {
    state = {
      bid: '',
      bdesc: '',
      rate: '',
      level: '',
      subject: '',
      students: ''
    }
    deleteBatch = () => {
        axios.delete('/api/teacher/batch/delete',
                    {
                      batchid:this.props.bid
                    })
            .then(response =>
              {
                 console.log("Batch details / Class details /Student details deleted")
              }) //end then
              .catch( error => {
                           console.log("Error in deleting batch student class records!!!",error);

              }); // end catch
      }

      saveClassDetails = (event) =>
        {
                event.preventDefault();
                console.log("Save class details",this.state.lessoncovered,this.state.homework,this.state.cbid,this.state.studentsid);
                axios.post('/api/teacher/batch/class/add',
                            {
                               lessoncovered : this.state.lessoncovered,
                               homework : this.state.homework,
                               batch: this.state.cbid,
                               students: this.state.studentsid,
                               classdate: this.state.classdate
                            })
                    .then(response =>
                      {
                         console.log("Class details updated")
                          this.setState({ classdetentry : false,
                                          updatestatus :'Class details updated',
                                          lessoncovered : '',
                                          homework: ''
                                        } ,
                                   () => { console.log("Class details updated batch and class table") }  );
                      }) //end then
                      .catch( error => {
                        this.setState({errmsg : "Error in saving class records"+error,updatestatus: 'Error in updating class details'+error},
                              () =>{
                                   console.log("Error in saving class records!!!",error);
                              });
                      }); // end catch
          } // end saveClassDetails

          handleInputChange = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.name : target.value;
            const name = target.type === 'checkbox' ? 'daysofweek' : target.name;
            //console.log('The Value in input change',value,name);

            this.setState({
              [name]: value
            } /*,
            () =>{
              console.log('Set State in Main Section',value,name);
            } */);
          }; //End handle Input change

      addClassInfo = () =>
          {
                 this.setState({
                 cbid: this.props.bid,
                 cbdesc: this.props.bdesc,
                 cbsubj: this.props.bsubj,
                 cblevel: this.props.blevel,
                 cbrate: this.props.brate,
                 modalIsOpen:true,
                strecords: this.props.studentdet }, () => {  console.log("Entry in class details---",this.props);});
          } // end addClassInfo

    componentWillReceiveProps = () =>{
      this.setState({
        bdesc: this.props.bdesc,
        rate : this.props.rate,
        level : this.props.level,
        subject: this.props.subject,
        bid: this.props.bid,
        students: this.props.students
      },
    () => {console.log("state - batchinfo",this.state)})
    }
    render()
    {
        return(<div>
            <div>
                  
                 <input value={this.state.bdesc} placeholder={this.props.batchdetails.batchdesc} name = "bdesc" onChange = {this.handleInputChange}/>
                 <input value={this.state.rate} placeholder= {this.props.batchdetails.rateperhour}  name = "rate" onChange = {this.handleInputChange}/>
                 <input value = {this.state.level} placeholder ={this.props.batchdetails.level} name = "level" onChange = {this.handleInputChange}/>
                 <input value = {this.state.subject} placeholder = {this.props.batchdetails.subject} name = "subject" onChange = {this.handleInputChange} />
                 <button>Save Changes</button> 
                 <Addstudent batchdet = {this.state.brecords} />
                 {/* <Allstudents studentrec = {this.state.studentrecs}/> */}
            </div>
        </div>)
    } 
}

export default BatchInfo

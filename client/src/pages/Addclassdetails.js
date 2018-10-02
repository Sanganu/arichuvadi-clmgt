import React, { Component } from 'react';
import axios from 'axios';
//import Modal from 'react-modal';
// import {Link} from 'react-router-dom';
//import Classentry from './Classentry';
//import Teacherheader from '../components/Teacherheader';
// const customStyle = {
//       content: {
//         top:'50%',
//         left:'50%',
//         right:'auto',
//         bottom:'auto',
//         marginRight:'-50%',
//         transform: 'translate(-50%,-50%)',
//         color:  'hsla(360, 100%, 8%, 1)'
//       }
// };

class BatchRecAddclass extends Component
{
                state = {
                       date: '',
                       modalIsOpen: false,
                       lessoncovered:'',
                       homework: '',
                       updatestatus: '',
               }; // end
         //  closeModal(){
      //     this.setState({modalIsOpen:false});
      //   }

        handleInputChange = (event) => {
              const target = event.target;
              const value =  target.value; //target.type === 'checkbox' ? target.checked :
              const name  = target.name;
              if ( target.type === 'checkbox')
              {
                    let studentsidlist = this.state.studentsid;
                    studentsidlist.push(value);
                    this.setState({
                      studentsid : studentsidlist
                    }, () => { console.log("Setting students record");});
              }
              else {
                this.setState({
                   [name]: value
                 } );
              }
        }; //End handle Input change

        // componentDidmount = () => {
        //     console.log("Add classdetails - Props",this.props.batchdet);
        // };
       

        saveClassDetails = (event) =>
        {
                event.preventDefault();
                console.log("Save class details",this.state.lessoncovered,this.state.homework);
                if ( this.state.lessoncovered === '' || this.state.homework === '' ||this.state.date === '')
                {
                  this.setState({updatestatus: "Empty Fields not accepted!!!!!!"},
                               ()=>{console.log("Empty Fields not expected");});
                }
                else
                {
                  axios.post('/api/teacher/batch/class/add',
                  {
                     lessoncovered : this.state.lessoncovered,
                     homework : this.state.homework,
                     batch: this.props.batchdet.bid,
                     classdate: this.state.date
                  })
                  .then((response) =>
                    {
                      console.log("The Response from saving class details",response.data);
                      this.props.newClassDetails({lessoncov:response.data.lessoncovered,
                            homework: response.data.homework,
                            cldate: response.data.classdate});
                      this.setState({ lessoncovered : '',
                                        homework: '',
                                        date: '',
                                        updatestatus: ''
                                      });
                    }) //end then
                    .catch( error => {
                      this.setState({updatestatus: 'Error in updating class details'+error},
                            () =>{
                                console.log("Error in saving class records!!!",error);
                            });
                    }); // end catch
                }
        } // end saveClassDetails

          // deleteBatch = () => { 
          //   axios.delete('/api/teacher/batch/delete',
          //               {
     
          //            batchid:this.props.bid
          //               })
          //       .then(response =>
          //         {
          //            console.log("Batch details / Class details /Student details deleted")
          //         }) //end then
          //         .catch( error => {
          //                      console.log("Error in deleting batch student class records!!!",error);

          //         }); // end catch
          // }
      render()
      {
          return( <form>
                  <h5 className="errmsg">{this.state.updatestatus}</h5>
                  <div className = "form-group row">
                      <label forhtml = "lessoncovered">Lesson Covered : </label>
                      <input type = "text"   value={this.state.lessoncovered} onChange = {this.handleInputChange} name = "lessoncovered"  id = "lessoncovered" placeholder="Lesson Covered" />
                  </div>
                  <div className = "form-group row">
                      <label forhtml = "homework">Homework : </label>
                      <input type = "text"   value={this.state.homework} onChange = {this.handleInputChange} name = "homework" id = "homework" placeholder = "Homework assigned"/>
                  </div>
                  <div className = "form-group row">
                      <label forhtml = "homework">Date: </label>
                      <input type = "text"   value={this.state.date} onChange = {this.handleInputChange} name = "date" id = "date" placeholder = "Date"/>
                  </div>
                  <button className = "createbutton"
                          onClick = {this.saveClassDetails}>Add Class Details
                  </button>
                  </form>
                   ) //end return
      } // end render
} // end component

export default BatchRecAddclass;
